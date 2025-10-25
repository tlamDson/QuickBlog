import React from "react";
import { assets } from "../assets/assets";

const Header = () => {
  return (
    <div className="mx-8">
      <div>
        <div className="inline-flex items-center justify-center gap-4 px-1.5 py-6 border-primary/40 bg-primary/10 rounded-full text-sm text-primary">
          <p>New : AI feature integrated</p>
          <img src={assets.star_icon} alt="" className="w-2.5" />
        </div>
        <h1 className="text-3xl sm:text-6xl font-semibold sm:leading-16 text-gray-700">
          Your own <span className="text-primary">blogging</span>, <br />{" "}
          platform
        </h1>
        <p>
          This is your space to think out load, to share what matters, and to
          write without filters. Whether it's one word or a thoudsand, your
          story starts right here.
        </p>
      </div>
    </div>
  );
};

export default Header;
