import React from 'react';
import {
    FaDribbbleSquare,
    FaFacebookSquare,
    FaGithubSquare,
    FaInstagram,
    FaTwitterSquare,
} from 'react-icons/fa';
const SocialIcon = ({ icon: Icon }) => (
    <Icon className="social-icon hover:bg-red-900" size={30} />
);
const Footer = () => {
    const items = [
        // Social media icons
        { type: 'icon', icon: FaFacebookSquare },
        { type: 'icon', icon: FaInstagram },
        { type: 'icon', icon: FaTwitterSquare },
        // Footer sections
        { type: 'section', title: 'Seasons & Events', items: [''] },
        { type: 'section', title: 'Discover', items: ['Explore', 'Experiences',] },
        { type: 'section', title: 'Useful Information', items: ['About', 'Travel Guidelines', 'Blogs'] },
    ];
    return (
        <div className='bg-red-800 mx-auto py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-300'>
            {/* Left section with brand and social icons */}
            <div>
                <h1 className='w-full text-3xl lg:text-4xl xl:text-5xl font-bold text-white'>TRAVELPEDIA</h1>
                <p className='py-4'>
                    One Platform for all your travel needs.
                </p>
                <div className='flex gap-3 md:w-[75%] my-6'>
                    {items.map((item, index) => (
                        item.type === 'icon' ? (
                            <SocialIcon key={index} icon={item.icon} />
                        ) : null
                    ))}
                </div>
            </div>
            {/* Right section with footer content organized in sections */}
            <div className='lg:col-span-2 flex justify-between mt-6'>
                {items.map((item, index) => (
                    item.type === 'section' ? (
                        <div key={index}>
                            <h6 className="font-medium text-gray-100 text-xl">{item.title}</h6>
                            <ul>
                                {item.items.map((subItem, subIndex) => (
                                    <li key={subIndex} className='py-2 text-sm'>{subItem}</li>
                                ))}
                            </ul>
                        </div>
                    ) : null
                ))}
            </div>
        </div>
    );
};
export default Footer;