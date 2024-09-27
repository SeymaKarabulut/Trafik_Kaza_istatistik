import React from "react";

const DetailButton = ({ styles }) => (
  <button type="button" className={`py-4 px-6 font-poppins font-medium text-[18px] text-white bg-red-700 rounded-[10px] outline-none ${styles}`}>
    İnceleyin
  </button>
);

export default DetailButton;
