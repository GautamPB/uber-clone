import Image from 'next/image'

const CarComponent = ({ image, carType, duration, price }) => {
    return (
        <div className="flex w-full items-center p-2 cursor-pointer hover:bg-gray-200">
            <div className="flex items-center space-x-2 flex-1">
                <div>
                    <Image src={image} alt="" width={100} height={100} />
                </div>

                <div>
                    <h1 className="font-semibold text-lg">{carType}</h1>
                    <h1 className="text-blue-500">{duration}</h1>
                </div>
            </div>

            <div className="font-semibold text-xl">
                <h1>${price}</h1>
            </div>
        </div>
    )
}

export default CarComponent
