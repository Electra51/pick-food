import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthProvider';
import useTitle from '../../hook/useTitle';
import ReviewRow from './ReviewRow';
import { ToastContainer, toast } from 'react-toastify';



const ReviewPage = () => {
    useTitle('ReviewPage')
    const { user, logOut } = useContext(AuthContext)
    const [reviews, setReviews] = useState([])



    useEffect(() => {

        fetch(`https://pick-food-server.vercel.app/reviews?email=${user?.email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem('pick-token')}`
            }
        })
            .then(res => {
                if (res.status === 401 || res.status === 403) {
                    return logOut()
                }
                return res.json()
            })
            .then(data => {
                setReviews(data)
            })
    }, [user?.email, logOut])



    const handleDelete = id => {
        const proceed = window.confirm('Are you sure to delete this?')
        if (proceed) {
            fetch(`https://pick-food-server.vercel.app/reviews/${id}`, {
                method: 'DELETE',
                headers: {
                    authorization: `Bearer ${localStorage.getItem('pick-token')}`
                }
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);

                    if (data.deletedCount > 0) {
                        toast.success('deleted successfully', {
                           theme:'colored'
                       });
                        const remaining = reviews.filter(review => review._id !== id)
                        setReviews(remaining)

                    }
                })
        }
    }




    return (
        <div  data-aos="zoom-in-up" data-aos-duration="1500">

            {reviews.length === 0 ?
                <p className='text-5xl font bold text-center text-warning my-20 bg-emerald-800 py-5'>No reviews were added</p>

                :
                <> <h2 className='text-2xl font bold text-center text-white my-10 bg-emerald-800'>You have {reviews.length} reviews here</h2>
                    <div className="overflow-x-auto w-full">
                        <table className="table w-full">
                            {/* <!-- head --> */}
                            <thead>
                                <tr className='pl-8'>
                                    <th>Service Name</th>
                                    <th>Reviews</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>

                                {

                                    reviews.map(review => <ReviewRow
                                        key={review._id}
                                        review={review}
                                        handleDelete={handleDelete}
                                    >
                                    </ReviewRow>)
                                }

                            </tbody>



                        </table>
                    </div></>
            }

<ToastContainer/>
        </div>
    );
};

export default ReviewPage;

