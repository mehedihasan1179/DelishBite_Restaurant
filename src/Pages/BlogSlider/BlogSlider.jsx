import {React, useState, useRef, useEffect} from 'react'
import './css/main.css'
// import './css/style.css'

function BlogSlider() {
    const sliderWrapperRef = useRef(null);
    const trackRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startX, setStartX] = useState(0);
    const [scrollLeft, setScrollLeft] = useState(0);
    const [endX, setEndX] = useState(0);

    const blogCards = [
        { title: '15-Minute Garlic Butter Shrimp Pasta', description: 'Whip up this delicious shrimp pasta in just 15 minutes! Juicy shrimp, al dente spaghetti, and a rich garlic butter sauce.', image: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2' },
        { title: 'One-Pan Chicken Fajita Tacos', description: 'Sizzling chicken fajita tacos in one pan in under 20 minutes. Packed with vibrant peppers and zesty spices.', image: 'https://images.unsplash.com/photo-1599921715136-c3fbfe6b87f0' },
        { title: '5-Ingredient Caprese Salad Wraps', description: 'Fresh tomatoes, mozzarella, basil, and balsamic glaze in a tortilla—ready in 10 minutes!', image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5' },
        { title: 'Speedy Veggie Stir-Fry with Soy Glaze', description: 'Toss veggies in a sweet and savory soy glaze for a healthy, 15-minute meal.', image: 'https://images.unsplash.com/photo-1512058564366-18510be2db19' },
        { title: 'Avocado Toast with a Twist', description: 'Elevate avocado toast with toppings like cherry tomatoes or feta. Ready in under 10 minutes.', image: 'https://images.unsplash.com/photo-1541519481457-763224274c66' },
        { title: '10-Minute BBQ Chicken Quesadillas', description: 'Crispy tortillas with shredded chicken, BBQ sauce, and cheese—ready in 10 minutes!', image: 'https://images.unsplash.com/photo-1595854341625-f33ee25dbf42' },
        { title: 'No-Cook Tuna Salad Lettuce Wraps', description: 'Refreshing tuna salad lettuce wraps, packed with protein, ready in 5 minutes.', image: 'https://images.unsplash.com/photo-1626700051175-97f30a48c828' },
        { title: 'Quick Pesto Veggie Flatbread', description: 'Pesto, veggies, and cheese on flatbread, baked in 12 minutes for a light dinner.', image: 'https://images.unsplash.com/photo-1621852004158-7779b2629aa8' },
        { title: 'Easy Breakfast Smoothie Bowl', description: 'Blend frozen fruit, yogurt, and milk for a smoothie bowl in 5 minutes.', image: 'https://images.unsplash.com/photo-1505252585461-04db1eb84625' },
        { title: '20-Minute Creamy Tomato Soup', description: 'Velvety tomato soup with canned tomatoes and pantry staples in 20 minutes.', image: 'https://images.unsplash.com/photo-1547592166-23ac45744c82' },
    ];

    const updateSliderPosition = () => {
        if (!sliderWrapperRef.current || !trackRef.current) return;
        const imageWidth = trackRef.current.querySelector('.blog-card')?.offsetWidth + 20 || 0;
        const offset = currentIndex * imageWidth;
        sliderWrapperRef.current.scrollLeft = offset;
    };

    const updateButtonState = () => {
        if (!sliderWrapperRef.current || !trackRef.current) return { canGoLeft: false, canGoRight: false };
        const imageWidth = trackRef.current.querySelector('.blog-card')?.offsetWidth + 20 || 0;
        const visibleImagesCount = Math.floor(sliderWrapperRef.current.offsetWidth / imageWidth);
        const canGoLeft = currentIndex > 0;
        const canGoRight = currentIndex < blogCards.length - visibleImagesCount;
        return { canGoLeft, canGoRight };
    };

    const { canGoLeft, canGoRight } = updateButtonState();

    const handleLeftClick = () => {
        if (canGoLeft) {
            setCurrentIndex(prevIndex => prevIndex - 1);
        }
    };

    const handleRightClick = () => {
        if (canGoRight) {
            setCurrentIndex(prevIndex => prevIndex + 1);
        }
    };

    const handleMouseDown = (event) => {
        setIsDragging(true);
        setStartX(event.pageX - sliderWrapperRef.current.offsetLeft);
        setScrollLeft(sliderWrapperRef.current.scrollLeft);
        event.preventDefault();
    };

    const handleMouseUp = () => {
        if (!isDragging) return;
        setIsDragging(false);
        const dragDistance = endX - startX;
        const dragThreshold = 50;
        const imageWidth = trackRef.current.querySelector('.blog-card')?.offsetWidth + 20 || 0;
        const visibleImagesCount = Math.floor(sliderWrapperRef.current.offsetWidth / imageWidth);

        if (Math.abs(dragDistance) > dragThreshold) {
            if (dragDistance < 0 && currentIndex < blogCards.length - visibleImagesCount) {
                setCurrentIndex(prevIndex => prevIndex + 1);
            } else if (dragDistance > 0 && currentIndex > 0) {
                setCurrentIndex(prevIndex => prevIndex - 1);
            }
        }
        updateSliderPosition();
    };

    const handleMouseMove = (event) => {
        if (!isDragging) return;
        setEndX(event.pageX - sliderWrapperRef.current.offsetLeft);
        const walk = (endX - startX) * 1.5;
        sliderWrapperRef.current.scrollLeft = scrollLeft - walk;
    };

    useEffect(() => {
        updateSliderPosition();
        window.addEventListener('resize', updateSliderPosition);
        return () => window.removeEventListener('resize', updateSliderPosition);
    }, [currentIndex]);


    return (
        <div className="slider-container">
            <div className="slider-header">
                <h2 className="slider-title">Quick & Easy</h2>
                <div className="slider-buttons">
                    <button id="left-btn" onClick={handleLeftClick} disabled={!canGoLeft}>
                        <i className="fa-solid fa-chevron-left"></i>
                    </button>
                    <button id="right-btn" onClick={handleRightClick} disabled={!canGoRight}>
                        <i className="fa-solid fa-chevron-right"></i>
                    </button>
                </div>
            </div>
            <div
                className="slider-wrapper"
                ref={sliderWrapperRef}
                onMouseDown={handleMouseDown}
                onMouseLeave={() => setIsDragging(false)}
                onMouseUp={handleMouseUp}
                onMouseMove={handleMouseMove}
            >
                <div className="slider-track" ref={trackRef}>
                    {blogCards.map((card, index) => (
                        <div
                            key={index}
                            className="blog-card"
                            style={{ backgroundImage: `url('${card.image}')` }}
                        >
                            <div className="card-content">
                                <h2 className="card-title">{card.title}</h2>
                                <p className="card-description">{card.description}</p>
                                <a href="#" className="read-more-btn">Read More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default BlogSlider