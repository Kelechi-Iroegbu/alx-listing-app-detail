// components/property/PropertyDetail.tsx
import { PropertyProps } from '@/interfaces/index';
import BookingSection from './BookingSection';
import ReviewSection from './ReviewSection';

const PropertyDetail: React.FC<{ property: PropertyProps }> = ({ property }) => {
  return (
    <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      {/* Left Section */}
      <div className="md:col-span-2">
        <h1 className="text-4xl font-bold">{property.name}</h1>
        <div className="flex items-center space-x-2 mt-2">
          <span className="text-yellow-500">{property.rating} stars</span>
          <span>{property.address.city}, {property.address.country}</span>
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-2 gap-4 mt-4">
          <img src={property.image} alt={property.name} className="col-span-2 w-full h-96 object-cover rounded-lg" />
        </div>

        {/* Description */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">Description</h2>
          <p>{property.description}</p>
        </div>

        {/* Amenities */}
        <div className="mt-4">
          <h2 className="text-2xl font-semibold">What this place offers</h2>
          <ul className="flex flex-wrap space-x-4">
            {property.category.map((amenity, index) => (
              <li key={index} className="bg-gray-200 p-2 rounded-md">{amenity}</li>
            ))}
          </ul>
        </div>

        {/* Reviews */}
        <ReviewSection reviews={property.reviews} />
      </div>

      {/* Right Section */}
      <div>
        <BookingSection price={property.price} />
      </div>
    </div>
  );
};

export default PropertyDetail;


// components/property/BookingSection.tsx
import { useState } from 'react';

const BookingSection: React.FC<{ price: number }> = ({ price }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const calculateTotal = () => {
    if (!checkIn || !checkOut) return 0;
    const diff = (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24);
    return diff > 0 ? diff * price : 0;
  };

  return (
    <div className="bg-white p-6 shadow-md rounded-lg">
      <h3 className="text-xl font-semibold">${price}/night</h3>
      <div className="mt-4">
        <label>Check-in</label>
        <input type="date" className="border p-2 w-full mt-2" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
      </div>
      <div className="mt-4">
        <label>Check-out</label>
        <input type="date" className="border p-2 w-full mt-2" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
      </div>
      <div className="mt-4">
        <p>Total payment: <strong>${calculateTotal()}</strong></p>
      </div>
      <button className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md">Reserve now</button>
    </div>
  );
};

export default BookingSection;


// components/property/ReviewSection.tsx
const ReviewSection: React.FC<{ reviews: any[] }> = ({ reviews }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold">Reviews</h3>
      {reviews.map((review, index) => (
        <div key={index} className="border-b pb-4 mb-4">
          <div className="flex items-center">
            <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full mr-4" />
            <div>
              <p className="font-bold">{review.name}</p>
              <p className="text-yellow-500">{review.rating} stars</p>
            </div>
          </div>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewSection;


// pages/property/[id].tsx
import { PROPERTYLISTINGSAMPLE } from '@/constants/index';
import { useRouter } from 'next/router';
import PropertyDetail from '@/components/property/PropertyDetail';

export default function PropertyPage() {
  const router = useRouter();
  const { id } = router.query;
  const property = PROPERTYLISTINGSAMPLE.find((item) => item.name === id);

  if (!property) return <p>Property not found</p>;

  return (
    <div>
      <PropertyDetail property={property} />
    </div>
  );
}
