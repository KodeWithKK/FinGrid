import type { SVGProps } from "react";

export type IconProps = SVGProps<SVGSVGElement>;

export function IconBrand(props: IconProps) {
  return (
    <svg viewBox="0 0 611 619" fill="currentColor" {...props}>
      <path d="M109.5 618c-52.4-.6-52-.6-67-8-15.3-7.5-27.1-19.7-34.7-35.8-6.9-14.5-6.6-9.6-7-133.7l-.3-112h231l7.5 2.3c11.4 3.6 19.6 8.6 28 17.1 8.7 8.8 14.1 18.1 17 29.7 1.9 7.5 2 11.5 2 124.3v116.6h-64.8c-35.6 0-85.8-.2-111.7-.5zM325.6 500.8c.2-107 .3-117.9 1.9-123.8 6-23 22.8-39.7 47-46.7 5.5-1.6 15.3-1.7 121.3-2.1l115.2-.3v110.5c0 118.3 0 117.5-5.1 131-3.7 9.9-8.9 17.7-17.8 26.7-9.5 9.5-17.5 14.6-29.9 18.8l-7.7 2.6-225 .5.1-117.2zM.7 177.3C.9 68 .9 65.3 2.9 57.5 4 53.1 6.9 45.7 9.2 41c3.4-6.9 6-10.3 13.8-18C33.9 12 43.3 6.5 57.2 2.7L65.5.5h220l.3 115.5c.3 129.5.6 123-7 138.1-7.3 14.7-20.3 25.9-36.5 31.6l-7.8 2.8-234 .5.2-111.7zM376.7 287.5c-3.8-.8-10.8-3.3-15.5-5.6-15.9-7.6-29.2-23.8-33.7-40.9-1.3-4.7-1.5-23.2-1.5-123.2V0h104.8c63.4 0 108.1.4 113.5 1 31.9 3.7 58.5 28.4 65.2 60.5 1.3 6.4 1.5 22.8 1.5 117.5v110l-113.7-.1c-91.5-.1-115.1-.4-120.6-1.4z" />
    </svg>
  );
}

export function IconLoader(props: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      strokeWidth={3}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <path d="M12 3c4.97 0 9 4.03 9 9"></path>
      <path
        strokeOpacity={0.3}
        d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"
      ></path>
    </svg>
  );
}

export function IconLoader2(props: IconProps) {
  return (
    <svg viewBox="0 0 24 24" {...props}>
      <defs>
        <linearGradient
          id="mingcuteLoadingFill0"
          x1="50%"
          x2="50%"
          y1="5.271%"
          y2="91.793%"
        >
          <stop offset="0%" stopColor="currentColor"></stop>
          <stop
            offset="100%"
            stopColor="currentColor"
            stopOpacity={0.55}
          ></stop>
        </linearGradient>
        <linearGradient
          id="mingcuteLoadingFill1"
          x1="50%"
          x2="50%"
          y1="15.24%"
          y2="87.15%"
        >
          <stop offset="0%" stopColor="currentColor" stopOpacity={0}></stop>
          <stop
            offset="100%"
            stopColor="currentColor"
            stopOpacity={0.55}
          ></stop>
        </linearGradient>
      </defs>
      <g fill="none">
        <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z"></path>
        <path
          fill="url(#mingcuteLoadingFill0)"
          d="M8.749.021a1.5 1.5 0 0 1 .497 2.958A7.5 7.5 0 0 0 3 10.375a7.5 7.5 0 0 0 7.5 7.5v3c-5.799 0-10.5-4.7-10.5-10.5C0 5.23 3.726.865 8.749.021"
          transform="translate(1.5 1.625)"
        ></path>
        <path
          fill="url(#mingcuteLoadingFill1)"
          d="M15.392 2.673a1.5 1.5 0 0 1 2.119-.115A10.48 10.48 0 0 1 21 10.375c0 5.8-4.701 10.5-10.5 10.5v-3a7.5 7.5 0 0 0 5.007-13.084a1.5 1.5 0 0 1-.115-2.118"
          transform="translate(1.5 1.625)"
        ></path>
      </g>
    </svg>
  );
}
