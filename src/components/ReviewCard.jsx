import React from 'react'
import avatar from '../assets/avatar.jpg'
// const details = [
//     {
//         img: avatar,
//         name: "user1",
//         review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Et hic nihil cumque delectus nobis provident atque! Qui nesciunt odit sint in culpa nobis, id nam perferendis! Iure asperiores doloribus officia!"
//     }
// ]
const ReviewCard = (props) => {
    return (
        <div className='text-center'>
            <div className="flex flex-col shadow-md rounded-md w-60 p-3 h-auto items-center m-9">
                <div className="image h-40 w-full rounded-lg bg-red-800 items-center flex justify-center" >
                    <img className="w-20 h-20 rounded-full" src={props.img} alt="img" />
                </div>
                <div className="flex flex-col">
                    <div className="User font-bold">
                        {props.name}
                    </div>
                    <div className="Review">
                        {props.review}
                    </div>
                </div>
            </div>


        </div>
    )
}

export default ReviewCard
