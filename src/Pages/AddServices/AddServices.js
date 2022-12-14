import React, { useState } from 'react';
import useTitle from '../../hook/useTitle';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddServices = () => {
    useTitle('AddServices');
    const [recipes, setRecipes] = useState({});
    const handleAddRecipes = event => {
        event.preventDefault();
        console.log(recipes);
        
        
        fetch('https://pick-food-server.vercel.app/services', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(recipes)
        })
            .then(res => res.json())
            .then(data => {
               
                if (data.acknowledged) {
                    toast.success('added successfully')
                    event.target.reset();
                }

        })
}

    const handleInputBlur = event => {
        const value = event.target.value;
                const field = event.target.name;
                const newRecipes = { ...recipes }
                newRecipes[field] = value;
                setRecipes(newRecipes);
        
    }
   
    return (
        <div className='my-20'>
            
            <div className="flex flex-col lg:flex-row justify-center items-center w-full gap-10">
                <img src="https://media.istockphoto.com/id/483264639/photo/breakfast.jpg?s=612x612&w=0&k=20&c=BwDINTffvXp5RTfa3SYihVpecDyosxwN-M50JBqV8k8=" alt="" data-aos="fade-right" data-aos-duration="1000"/>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-gray-300 py-10" data-aos="fade-left" data-aos-duration="800">
                <p className='text-center text-2xl text-black font-semibold'>Please add a new service</p>
                    <form onSubmit={handleAddRecipes} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Name</span>
                            </label>
                            <input onBlur={handleInputBlur} type="text" name='name' placeholder="your name" className="input input-bordered" required/>
                        </div>
                        <div className="form-control">
                        
            <label className="label">
            Image URL
            </label>
            <input onBlur={handleInputBlur} name="img" type="text" placeholder="img URL"  className="input input-bordered "  required/>
                
                            
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Price</span>
                            </label>
                            <input onBlur={handleInputBlur} type="text" name='price' placeholder="price" className="input input-bordered" required/>
                            
                        </div>
                        <div className="form-control">
                        <label className="label">
                                <span className="label-text">Description</span>
                            </label>
                            <input onBlur={handleInputBlur} type="text" name='description' placeholder="description" className="input input-bordered" required/>
                        
                            
                        </div>
                        
                        
                        <div className="form-control mt-6">
                            <input className="btn btn-warning" type="submit" value="Add Service" />
                        </div>
                    </form>
                    
                </div>
            </div>
  <ToastContainer/>
        </div>
     
    );
};

export default AddServices;