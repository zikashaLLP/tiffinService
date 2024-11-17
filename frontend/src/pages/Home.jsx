import Header from '@/components/Header';
import Footer from './Footer';
import SpecialDish from '@/components/SpecialDish';
import SpecialDishSection from '@/components/SpecialDishSection';
import Working from '@/components/Working';
import { Link } from 'react-router-dom';
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="sticky top-0 z-50">
        <Header />
      </div>

      <main className="flex-grow">
        <div className="bg-light-yellow bg-opacity-30 pb-16">
          <SpecialDish className="container mx-auto" />
        </div>
        <SpecialDishSection className=""/>

        <div style={{background: `url('/banner.png')`, backgroundSize: 'cover'}} className="container rounded-xl my-20">
          <div className="p-20">
            <h1 className="text-white text-4xl mb-3">The fastest</h1>
            <h1 className="text-white text-5xl font-semibold mb-3">Delivery <span className="text-primary">Food</span></h1>
            <Link
              className="btn-order"
              to={'/menu'}
            >Order now</Link>
          </div>
        </div>

        <Working/>
      </main>

      <Footer />
    </div>
  );
}
