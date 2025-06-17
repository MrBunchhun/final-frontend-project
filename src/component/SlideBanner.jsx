const SlideBanner = ({ image }) => {
  return (
    <div className="relative w-full overflow-hidden rounded-lg" style={{ height: "70vh", minHeight: "300px" }}>
      {/* Background Image */}
      <img
        className="absolute top-1/2 left-1/2 w-full h-full object-cover -translate-x-1/2 -translate-y-1/2"
        src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
        alt={image.title}
        loading="lazy"
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Text content */}
      <div className="relative z-10 px-6 md:px-12 py-8 max-w-4xl text-white flex flex-col justify-center h-full">
        <h2 className="text-3xl md:text-5xl font-bold mb-4">{image.title}</h2>
        <p className="text-base md:text-lg line-clamp-3 mb-6">
          {image.overview || "No description available."}
        </p>

        <div className="flex flex-wrap gap-4 items-center">
          <div className="inline-flex items-center gap-2 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-md">
            <span>Rating:</span>
            <span>{Number(image.vote_average).toFixed(1)}</span>
          </div>

          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-6 py-2 rounded-md transition shadow cursor-not-allowed"
            disabled
          >
            ▶ Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideBanner;
