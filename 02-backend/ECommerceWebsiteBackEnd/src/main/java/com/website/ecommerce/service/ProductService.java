package com.website.ecommerce.service;

import com.website.ecommerce.dao.CheckoutRepository;
import com.website.ecommerce.dao.HistoryRepository;
import com.website.ecommerce.dao.ProductRepository;
import com.website.ecommerce.entity.Checkout;
import com.website.ecommerce.entity.History;
import com.website.ecommerce.entity.Product;
import com.website.ecommerce.responsemodels.ShelfCurrentLoansResponse;
import net.bytebuddy.asm.Advice;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Service
@Transactional
public class ProductService {

    private ProductRepository productRepository;

    private CheckoutRepository checkoutRepository;

    private HistoryRepository historyRepository;

    public ProductService(ProductRepository productRepository, CheckoutRepository checkoutRepository,
                          HistoryRepository historyRepository ){
            this.productRepository = productRepository;
            this.checkoutRepository = checkoutRepository;
            this.historyRepository= historyRepository;

    }

    public Product checkoutProduct(String userEmail, Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);

        Checkout validateCheckout  = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);

        if(!product.isPresent() || validateCheckout != null || product.get().getQuantityAvailable()<=0){
            throw new Exception("Product doesn't exist or already checked out by user");
        }

        product.get().setQuantityAvailable(product.get().getQuantityAvailable()-1);

        productRepository.save(product.get());

        Checkout checkout = new Checkout(
                userEmail,
                LocalDate.now().toString(),
                LocalDate.now().plusDays( 7).toString(),
        product.get().getId()
        );

        checkoutRepository.save(checkout);

        return product.get();
    }

    public Boolean checkoutProductByUser(String userEmail, Long productId){
        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);

        if(validateCheckout != null){
            return true;
        }
        else{
            return false;
        }
    }

    public int currentLoansCount(String userEmail){
        return checkoutRepository.findProductsByUserEmail(userEmail).size();
    }

    public List<ShelfCurrentLoansResponse> currentLoans(String userEmail) throws Exception{

        List<ShelfCurrentLoansResponse> shelfCurrentLoansResponses = new ArrayList<>();

        List<Checkout> checkoutList = checkoutRepository.findProductsByUserEmail(userEmail);

        List<Long> productIdList = new ArrayList<>();

        for(Checkout i : checkoutList){
            productIdList.add(i.getProductId());
        }

        List<Product> products = productRepository.findProductsByProductIds(productIdList);

        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

        for(Product product : products){
            Optional<Checkout> checkout = checkoutList.stream()
                    .filter(x-> x.getProductId() == product.getId()).findFirst();

            if(checkout.isPresent()){

                Date d1 = sdf.parse(checkout.get().getReturnDate());
                Date d2 = sdf.parse(LocalDate.now().toString());

                TimeUnit time = TimeUnit.DAYS;

                long difference_In_Time = time.convert(d1.getTime() - d2.getTime(),
                        TimeUnit.MILLISECONDS);

            shelfCurrentLoansResponses.add(new ShelfCurrentLoansResponse(product, (int) difference_In_Time));


            }

        }

        return shelfCurrentLoansResponses;

    }

    public void returnProduct(String userEmail, Long productId) throws Exception{
        Optional<Product> product = productRepository.findById(productId);

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail, productId);

        if(!product.isPresent() || validateCheckout == null){
            throw new Exception("Product does not exist or not checked out by the user");
        }
        product.get().setQuantityAvailable(product.get().getQuantityAvailable()+1);

        productRepository.save(product.get());

        checkoutRepository.deleteById(validateCheckout.getId());

        History history = new History(
                userEmail,
                validateCheckout.getCheckoutDate(),
                LocalDate.now().toString(),
                product.get().getTitle(),
                product.get().getSeller(),
                product.get().getDescription(),
                product.get().getImg()
        );

        historyRepository.save(history);
    }

    public void renewLoan(String userEmail,Long productId ) throws Exception{

        Checkout validateCheckout = checkoutRepository.findByUserEmailAndProductId(userEmail,productId);

        if(validateCheckout == null){
            throw new Exception("Product does not exist or not checked out by user");
        }

        SimpleDateFormat sdFormat = new SimpleDateFormat("yyyy-MM-dd");

        Date d1 = sdFormat.parse(validateCheckout.getReturnDate());
        Date d2 = sdFormat.parse(LocalDate.now().toString());

        if(d1.compareTo(d2)>0 || d1.compareTo(d2) ==0){
            validateCheckout.setReturnDate(LocalDate.now().plusDays(7).toString());
            checkoutRepository.save(validateCheckout);


        }
    }
}



