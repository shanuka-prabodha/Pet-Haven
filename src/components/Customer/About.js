import pet from '../../images/pethed.jpg'
import '../../styles/customer.css'

export default function About() {

    return (
        <div id="about">

            <div className='container' style={{marginTop: '20px'}}>
                <div className='row'>
                    <div className='col-xs-12 col-md-6'>
                        <img src={pet} style={{width: '500px', height: '300px'}}/>
                    </div>
                    <div className='col-xs-12 col-md-6'>
                        <h2>About us</h2>
                    </div>

                    <div>
                        <p className='list-style'>
                            Our mission is to provide affordable community-based multi-cultural services for families in
                            the Denver metropolitan area and enhancing the lives of parents and children with physical
                            and intellectual disabilities. These services include parental education and support, family
                            therapy, individual therapy, art therapy and classes, children’s therapy, single mom
                            education, and support. Our program is provided remotely and in-person at our Family Life
                            Center.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}