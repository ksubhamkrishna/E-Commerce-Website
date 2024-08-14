import ShelfCurrentLoans from "../../../models/ShelfCurrentLoans";

export const LoansModal:React.FC<{shelfCurrentLoan: ShelfCurrentLoans, mobile: boolean, returnProduct:any}>=(props) => {
    return(
<div className='modal fade' id={props.mobile?  `mobilemodal${props.shelfCurrentLoan.product.id}`:
`modal${props.shelfCurrentLoan.product.id}`} data-bs-backdrop = 'static' data-bs-keyboard = 'false'
aria-labelledby = 'staticBackdropLabel' aria-hidden = 'true' key = {props.shelfCurrentLoan.product.id}>
<div className="modal-dialog" >
    <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id='staticBackdropLabel'>
                Loan Options
            </h5>
            <button type='button' className="btn-close" data-bs-dismiss = 'modal' aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <div className="container">
                < div className="mt-3">
                    <div className="row">
                        <div className="col-2">
                            {props.shelfCurrentLoan.product?.img?
                            <img src={props.shelfCurrentLoan.product?.img}
                        width= '56'height='87' alt='Product'/>
                        :
                        <img src ={require('./../../../Images/BooksImages/Books.jpg')} 
                        width = '56' height = '87' alt='Product' 
                        />
                        }
                        </div>
                        <div className="col-10">
                            <h6>{props.shelfCurrentLoan.product.seller}</h6>
                            <h4>{props.shelfCurrentLoan.product.title}</h4>
                        </div>
                    </div>
                    <hr/>
                    {props.shelfCurrentLoan.daysLeft > 0 && (
                                            <p className='text-secondary'>
                                                Due in {props.shelfCurrentLoan.daysLeft} days.
                                            </p>
                                        )}
                                        {props.shelfCurrentLoan.daysLeft === 0 && (
                                            <p className='text-success'>
                                                Due Today.
                                            </p>
                                        )}
                                        {props.shelfCurrentLoan.daysLeft < 0 && (
                                            <p className='text-danger'>
                                                Past due by {props.shelfCurrentLoan.daysLeft} days.
                                            </p>
                                        )}

                    <div className="list-group mt-3">
                        <button data-bs-dismiss = 'modal' className="list-group-item list-group-item-action"
                            aria-current = 'true'>
                                Return Product
                        </button>
                        <button data-bs-dismiss = 'modal'
                        className={props.shelfCurrentLoan.daysLeft<0?
                            'list-group-item list-group-item-action inactiveLink':
                            'list-group-item list-group-item-action'
                        }>
                            {props.shelfCurrentLoan.daysLeft<0?
                        'Latedues cannot be renewed'  : 'Renew loan for 7 days'  
                        }
                        </button>
                        </div>                    
                </div>
            </div>
        </div>
        <div className="modal-footer">
            <button type = 'button' className="btn btn-secondary" data-bs-dismiss='modal'>
Close
            </button>
        </div>
    </div>
</div>

</div>
    );
}