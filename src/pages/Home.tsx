import { Link } from "react-router-dom";

export const Home: React.FC = () => {
  return (
    <div className="bg-primary">
      <div className="relative flex flex-col justify-center items-center h-screen gap-5">
        <h1 className="text-lg font-bold text-secondary">
          hi, Apakah ingin bertanya dengan sahabat?
        </h1>
        <Link
          to="/chat"
          className="relative p-0.5 inline-flex items-center justify-center font-bold overflow-hidden group rounded-md"
        >
          <span className="w-full h-full bg-gradient-to-br from-[#ff8a05] via-[#ff5478] to-[#ff00c6] group-hover:from-[#ff00c6] group-hover:via-[#ff5478] group-hover:to-[#ff8a05] absolute"></span>
          <span className="relative px-6 py-3 transition-all ease-out bg-gray-900 rounded-md group-hover:bg-opacity-0 duration-400">
            <span className="relative text-secondary">Mulai disini!</span>
          </span>
        </Link>

        <span className="absolute bottom-10 text-[10px] text-secondary">
          &copy; Andra Rizki Pratama 2024
        </span>
      </div>
    </div>
  );
};
