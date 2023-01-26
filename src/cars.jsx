import React, { useState, useEffect } from "react";
import Carousel from "nuka-carousel/lib/carousel";

const CarsList = () => {
  const [cars, setCars] = useState({});
  const [current, setCurrent] = useState(0);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://mocki.io/v1/4f7bf80f-e4c8-44c5-9be2-afc649a5af96"
      );
      const data = await response.json();
      setLoading(false);
      setCars(data.cars);
    } catch (error) {
      setError(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const showCar = (id) => {
    id === current ? setCurrent(0) : setCurrent(id);
  };

  return (
    <>
      {loading
        ? "Loading..."
        : cars.length > 0 &&
          cars.map((car) => {
            return (
              <div key={car.id} className="flex justify-between items-center">
                <div>
                  <button
                    className="rounded-lg bg-green-700 text-md mx-5 mt-12 px-12"
                    onClick={() => showCar(car.id)}
                  >
                    Show car {car.id}
                  </button>
                </div>
                <div className="w-1/2 right-0 mr-48 top-0 mt-12 absolute">
                  {error ? (
                    <h1 className="text-red-600 font-bold text-center">
                      {error}
                    </h1>
                  ) : (
                    current === car.id && (
                      <div
                        style={{
                          textAlign: "center",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          placeItems: "center",
                          width: "fit",
                        }}
                      >
                        <br />
                        <div className="name">
                          <h2 className="text-3xl font-bold">
                            <u> {car.carName}</u>
                          </h2>
                        </div>
                        <div className="slider">
                          <div className="w-auto sm:w-auto xs:w-auto md:w-96 h-fit">
                            <Carousel
                              dragging={true}
                              wrapAround={true}
                              slidesToShow={1}
                              autoplay={true}
                              cellAlign="center"
                              speed={500}
                              defaultControlsConfig={{
                                nextButtonText: ">",
                                prevButtonText: "<",
                              }}
                            >
                              {car.images.map((image, index) => (
                                <img
                                  key={image}
                                  src={image}
                                  alt={car.carName + index}
                                  className="object-contain h-80 w-full"
                                  width={500}
                                  height={500}
                                />
                              ))}
                            </Carousel>
                          </div>
                        </div>
                        <div className="details">{car.detail}</div>
                        <br />
                        <div className="features">
                          <h2 className="text-secondary my-4 underline italic">
                            Features
                          </h2>
                          <ul>
                            {car.features.map((feature) => (
                              <li key={feature}>{feature}</li>
                            ))}
                          </ul>
                        </div>
                        <br />
                        <h2 className="text-secondary my-4 font-bold italic">
                          Included in the price
                        </h2>
                        <div className="includedPrice">
                          <u>
                            {car.includedInThePrice.map((included) => (
                              <li key={included} className="no-underline">
                                {included}
                              </li>
                            ))}
                          </u>
                        </div>
                        <br />
                      </div>
                    )
                  )}
                </div>
              </div>
            );
          })}
    </>
  );
};

export default CarsList;
