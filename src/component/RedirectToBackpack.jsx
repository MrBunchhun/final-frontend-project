// components/RedirectToBackpack.js
import { useEffect } from "react";

const RedirectToBackpack = () => {
  useEffect(() => {
    window.location.href = "https://final-information-production.up.railway.app/admin/login";
  }, []);

  return (
    <p className="text-white text-center mt-10">
      Redirecting to admin panel...
    </p>
  );
};

export default RedirectToBackpack;
