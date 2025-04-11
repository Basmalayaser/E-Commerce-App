
import React, { useState, useContext } from 'react';
import style from './CategorySlider.module.css';
import axios from 'axios';
import { Virtual, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Spinner, Tooltip, Button } from "@nextui-org/react";
import 'swiper/css';
import 'swiper/css/navigation';
import { CategoryContext } from '../../Context/CategoryContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';

export default function CategorySlider() {
  const { allCategories, isLoading, error, isError } = useContext(CategoryContext);
  const [tooltipIndex, setTooltipIndex] = useState(null);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [loadingSubCategories, setLoadingSubCategories] = useState(false);

  async function fetchSubCategory(id) {
    if (!id) return;
    setLoadingSubCategories(true);
    try {
      const response = await axios.get(`https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`);
      setSubCategoryData(response.data?.data || []);
    } catch (error) {
      setSubCategoryData([]);
    } finally {
      setLoadingSubCategories(false);
    }
  }

  if (isLoading) return <Loader />;
  if (isError) return (
    <div className="text-center">
      <p>Error: {error.message}</p>
    </div>
  );

  return (
    <div className="bg-[#eee] py-10">
      <div className="container lg:px-40 px-10 mx-auto">
      <div className={`${style.headind} pt-10 mb-10  text-3xl text-center font-semibold`}>
          <h2 className='archivo-black-regular'>Categories</h2>
       </div>
        <Swiper
           modules={[Virtual, Navigation]}
            slidesPerView={3}
            centeredSlides={false}
            spaceBetween={30}
            navigation={true}
            virtual
        >
          {allCategories?.map((category, index) => (
            <SwiperSlide key={category._id} virtualIndex={index}>
              <Link to={`/categoryDetails/${category._id}`}>
                <div
                  className="hover:cursor-pointer text-center w-fit mx-auto categoryText"
                  onMouseEnter={() => {
                    setTooltipIndex(index);
                    fetchSubCategory(category._id);
                  }}
                  onMouseLeave={() => {
                    setTooltipIndex(null);
                    setSubCategoryData([]);
                  }}
                >
                  <Tooltip
                    isOpen={tooltipIndex === index}
                    onOpenChange={(open) => setTooltipIndex(open ? index : null)}
                    content={
                      loadingSubCategories ? (
                        <div className="px-5">
                          <Spinner color="primary" />
                        </div>
                      ) : subCategoryData.length === 0 ? (
                        <div>No available products</div>
                      ) : (
                        <div>
                          {subCategoryData.map((subCat) => (
                            <p key={subCat._id} className="text-lg p-1">{subCat.name}</p>
                          ))}
                        </div>
                      )
                    }
                    placement="bottom"
                    className="bg-white shadow-md rounded-lg p-2"
                    closeDelay={0} // Close immediately on mouse leave
                    motionProps={{ variants: { // Smooth animation
                      enter: { opacity: 1, transition: { duration: 0.2 } },
                      exit: { opacity: 0, transition: { duration: 0.1 } },
                    }}}
                  >
                    <div>
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-40 h-40 rounded-full object-cover"
                        loading="lazy"
                      />
                      <h3 className="pt-8 text-xl font-semibold ps-6">{category.name}</h3>
                    </div>
                  </Tooltip>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}