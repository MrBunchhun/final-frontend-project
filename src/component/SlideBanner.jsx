const SlideBanner = ({ image }) => {
  return (
    <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-lg">
      {/* Background Image */}
      <img
        className="absolute block w-full h-full object-cover top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        src={`https://image.tmdb.org/t/p/original${image.backdrop_path}`}
        alt={image.title}
        loading="lazy"
      />

      {/* Dark overlay for text readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50" />

      {/* Text content */}
      <div className="relative z-10 px-4 md:px-10 py-6 md:py-12 max-w-4xl text-white flex flex-col justify-center h-full">
        <h2 className="text-2xl md:text-4xl font-bold mb-3">{image.title}</h2>
        <p className="text-sm md:text-base line-clamp-3 mb-4">
          {image.overview || "No description available."}
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          {/* Rating Badge */}
          <div className="inline-flex items-center gap-2 bg-yellow-400 text-black font-semibold px-3 py-1 rounded-md">
            <span>Rating:</span>
            <span>{Number(image.vote_average).toFixed(1)}</span>
          </div>

          {/* Watch Trailer Button */}
          <button
            onClick={async () => {
              const res = await request(`movies/${movie.tmdb_id}/trailer`);
              if (res.key) {
                setTrailerKey(res.key); 
                setShowTrailer(true);
              } else {
                alert("Trailer not available");
              }
            }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-5 py-2 rounded-md transition shadow"
          >
            ▶ Watch Trailer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SlideBanner;
