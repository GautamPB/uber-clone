import Image from 'next/image'
import Link from 'next/link'

const ActionButton = ({ imageSrc, title, link }) => {
    return (
        <Link href={link} passHref>
            <div className="flex-1 bg-gray-200 flex flex-col items-center rounded-lg p-4 cursor-pointer hover:scale-105 transform transition text-xl">
                <Image src={imageSrc} alt="" width={100} height={100} />
                <h1 className="font-semibold">{title}</h1>
            </div>
        </Link>
    )
}

export default ActionButton
