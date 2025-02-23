interface IconProps {
  size?: string;
  color?: string;
}

type IconName = string;

const Logo: React.FC<IconProps> = ({ size = 104, color }) => (
  <svg width={size} viewBox="0 0 612 178" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M34 151L150.5 34.5" stroke={color} strokeWidth="28" />
    <path d="M135 150L19 34" stroke={color} strokeWidth="28" />
    <circle cx="85" cy="24" r="24" fill={color} />
    <path
      d="M293.7 133.4C290.2 137.6 286.6 140.6 282.9 142.4C279.2 144.1 274.6 144.95 269.1 144.95C258.2 144.95 250 141.6 244.5 134.9C239.1 128.1 236.4 118.05 236.4 104.75V60.2H253.35V102.05C253.35 111.55 254.8 118.5 257.7 122.9C260.7 127.2 265.45 129.35 271.95 129.35C279.15 129.35 284.4 127.05 287.7 122.45C291.1 117.85 292.8 110.5 292.8 100.4V60.2H309.75V143H293.7V133.4ZM326.784 60.2H342.834V69.05C346.334 65.25 349.984 62.5 353.784 60.8C357.584 59.1 362.034 58.25 367.134 58.25C378.334 58.25 386.634 61.6 392.034 68.3C397.434 74.9 400.134 85.1 400.134 98.9V143H383.184V101.6C383.184 91.9 381.634 84.85 378.534 80.45C375.534 76.05 370.734 73.85 364.134 73.85C357.234 73.85 352.084 76.15 348.684 80.75C345.384 85.25 343.734 92.3 343.734 101.9V143H326.784V60.2ZM417.019 60.2H433.969V143H417.019V60.2ZM417.019 32.15H433.969V50.9H417.019V32.15ZM508.153 133.4C504.653 137.6 501.053 140.6 497.353 142.4C493.653 144.1 489.053 144.95 483.553 144.95C472.653 144.95 464.453 141.6 458.953 134.9C453.553 128.1 450.853 118.05 450.853 104.75V60.2H467.803V102.05C467.803 111.55 469.253 118.5 472.153 122.9C475.153 127.2 479.903 129.35 486.403 129.35C493.603 129.35 498.853 127.05 502.153 122.45C505.553 117.85 507.253 110.5 507.253 100.4V60.2H524.203V143H508.153V133.4ZM562.538 100.4L535.988 60.2H555.188L572.588 87.5L589.688 60.2H609.038L582.488 100.4L611.738 143H591.488L572.588 113L553.538 143H533.438L562.538 100.4Z"
      fill={color}
    />
    <path
      d="M15 24V93.0888C15 131.7 46.3401 163 85 163C123.66 163 155 131.7 155 93.0888V24"
      stroke={color}
      strokeWidth="30"
    />
  </svg>
);

const NotFound: React.FC<IconProps> = ({ size = 61 }) => (
  <svg width={size} viewBox="0 0 61 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M54.7186 23.0387H6.28138C3.08841 23.0387 0.5 25.6192 0.5 28.8024C0.5 31.9856 3.08841 34.5661 6.28138 34.5661H54.7186C57.9116 34.5661 60.5 31.9856 60.5 28.8024C60.5 25.6192 57.9116 23.0387 54.7186 23.0387Z"
      fill="#444444"
    />
    <path
      d="M49.9512 30.4402H19.3947C16.2017 30.4402 13.6133 33.0207 13.6133 36.2039C13.6133 39.3871 16.2017 41.9675 19.3947 41.9675H49.9512C53.1441 41.9675 55.7326 39.3871 55.7326 36.2039C55.7326 33.0207 53.1441 30.4402 49.9512 30.4402Z"
      fill="#444444"
    />
    <path
      d="M45.9848 9.26782H12.4591C9.26614 9.26782 6.67773 11.8484 6.67773 15.0317C6.67773 18.215 9.26614 20.7955 12.4591 20.7955H45.9848C49.1777 20.7955 51.7661 18.215 51.7661 15.0317C51.7661 11.8484 49.1777 9.26782 45.9848 9.26782Z"
      fill="#444444"
    />
    <path
      d="M34.6355 37.5726C40.3411 37.5726 44.9664 32.9613 44.9664 27.273C44.9664 21.5848 40.3411 16.9735 34.6355 16.9735C28.93 16.9735 24.3047 21.5848 24.3047 27.273C24.3047 32.9613 28.93 37.5726 34.6355 37.5726Z"
      fill="#444444"
    />
    <path
      d="M34.6354 38.8012C31.5466 38.8012 28.6431 37.602 26.4591 35.4246C24.2751 33.2472 23.0723 30.3525 23.0723 27.2731C23.0723 24.1937 24.2751 21.299 26.4591 19.1216C28.6431 16.9442 31.5466 15.745 34.6354 15.745C37.7241 15.745 40.6277 16.9442 42.8117 19.1216C44.9957 21.299 46.1985 24.1937 46.1985 27.2731C46.1985 30.1805 45.1097 32.9571 43.1325 35.0917C42.6708 35.5899 41.8916 35.6211 41.3919 35.1608C40.8922 34.7005 40.8609 33.9237 41.3226 33.4255C42.8784 31.746 43.7351 29.5608 43.7351 27.2731C43.7351 22.2708 39.6532 18.2014 34.6358 18.2014C29.6183 18.2014 25.5365 22.2708 25.5365 27.2731C25.5365 32.2754 29.6183 36.3448 34.6358 36.3448C35.7678 36.3448 36.8719 36.1405 37.9172 35.7374C38.5517 35.4926 39.265 35.8072 39.5105 36.4399C39.7561 37.0726 39.4405 37.7836 38.8059 38.0285C37.476 38.5411 36.073 38.8012 34.6358 38.8012H34.6354Z"
      fill="white"
    />
    <path
      d="M50.4595 43.8796C50.1442 43.8796 49.829 43.7596 49.5886 43.52L41.2827 35.2392C40.8016 34.7596 40.8016 33.982 41.2827 33.5024C41.7637 33.0228 42.5437 33.0228 43.0247 33.5024L51.3307 41.7832C51.8118 42.2628 51.8118 43.0404 51.3307 43.52C51.0903 43.76 50.7751 43.8796 50.4595 43.8796Z"
      fill="white"
    />
    <path
      d="M28.3535 27.9663C27.9694 27.9663 27.6582 27.6557 27.6582 27.273C27.6582 23.4373 30.7883 20.3163 34.6361 20.3163C35.0203 20.3163 35.3314 20.6269 35.3314 21.0095C35.3314 21.3922 35.0203 21.7027 34.6361 21.7027C31.5556 21.7027 29.0489 24.2015 29.0489 27.273C29.0489 27.6561 28.7377 27.9663 28.3535 27.9663Z"
      fill="#383838"
    />
    <path
      d="M50.7912 46.1756L44.8015 40.204C44.0037 39.4087 44.0037 38.1192 44.8015 37.3238L45.1156 37.0106C45.9134 36.2152 47.2068 36.2152 48.0046 37.0106L53.9943 42.9821C54.7921 43.7775 54.7921 45.067 53.9943 45.8624L53.6802 46.1756C52.8824 46.971 51.589 46.971 50.7912 46.1756Z"
      fill="#444444"
    />
    <path
      d="M52.2351 48C51.3605 48 50.5381 47.6604 49.9195 47.0437L43.9299 41.0722C43.3113 40.4555 42.9707 39.6356 42.9707 38.7637C42.9707 37.8917 43.3113 37.0718 43.9299 36.4551L44.244 36.1423C45.5206 34.8692 47.5984 34.8696 48.875 36.1423L54.8647 42.1139C56.1414 43.3866 56.1414 45.4581 54.8647 46.7309L54.5506 47.0441C53.932 47.6608 53.1096 48.0003 52.2351 48.0003V48ZM46.5591 37.6425C46.3516 37.6425 46.1437 37.7212 45.9857 37.8791L45.6715 38.1923C45.5184 38.345 45.4338 38.5482 45.4338 38.764C45.4338 38.9799 45.518 39.1831 45.6715 39.3358L51.6612 45.3073C51.8144 45.46 52.0182 45.5443 52.2347 45.5443C52.4512 45.5443 52.655 45.4604 52.8082 45.3073L53.1223 44.9941C53.2755 44.8414 53.3597 44.6382 53.3597 44.4224C53.3597 44.2065 53.2755 44.0033 53.1223 43.8506L47.1326 37.8791C46.9746 37.7216 46.7667 37.6425 46.5591 37.6425Z"
      fill="white"
    />
    <path
      d="M46.2228 27.2731C46.2228 28.2921 46.0901 29.2796 45.8409 30.2202C45.3113 30.364 44.7543 30.4405 44.1793 30.4405C40.6896 30.4405 37.8613 27.6204 37.8613 24.1417C37.8613 21.4721 39.5266 19.191 41.8783 18.2738C44.5266 20.3832 46.2228 23.6305 46.2228 27.2731Z"
      fill="#444444"
    />
    <path
      d="M48.6095 26.9576C51.0768 24.4978 51.0768 20.5096 48.6095 18.0497C46.1421 15.5899 42.1418 15.5899 39.6745 18.0497C37.2072 20.5096 37.2072 24.4978 39.6745 26.9576C42.1418 29.4175 46.1421 29.4174 48.6095 26.9576Z"
      fill="#0D99FF"
    />
    <path
      d="M44.1513 26.0739C43.6162 26.0739 43.1981 25.9406 42.897 25.6738C42.5959 25.4071 42.3835 25.007 42.2598 24.4735C42.1361 23.94 42.0742 23.2732 42.0742 22.4729C42.0742 21.6727 42.1361 21.004 42.2598 20.4672C42.3835 19.9304 42.5959 19.5288 42.897 19.2617C43.1981 18.9949 43.6158 18.8616 44.1513 18.8616C44.6867 18.8616 45.1026 18.9949 45.4003 19.2617C45.6981 19.5284 45.9086 19.9304 46.0323 20.4672C46.156 21.004 46.2179 21.6727 46.2179 22.4729C46.2179 23.2732 46.156 23.94 46.0323 24.4735C45.9086 25.007 45.6977 25.4071 45.4003 25.6738C45.1026 25.9406 44.6864 26.0739 44.1513 26.0739ZM44.1513 25.0534C44.3987 25.0534 44.5943 24.975 44.7382 24.8182C44.882 24.6615 44.9875 24.3966 45.0542 24.0229C45.1209 23.6495 45.1544 23.1327 45.1544 22.4722C45.1544 21.8117 45.1209 21.2853 45.0542 20.9119C44.9871 20.5385 44.882 20.2733 44.7382 20.1165C44.5943 19.9597 44.3987 19.8813 44.1513 19.8813C43.9038 19.8813 43.7063 19.9597 43.5592 20.1165C43.412 20.2733 43.3065 20.5385 43.2432 20.9119C43.1794 21.2856 43.1478 21.8057 43.1478 22.4722C43.1478 23.1387 43.1794 23.6495 43.2432 24.0229C43.3065 24.3966 43.412 24.6615 43.5592 24.8182C43.7063 24.975 43.9035 25.0534 44.1513 25.0534Z"
      fill="white"
    />
    <path
      d="M24.107 18.5361C23.8916 18.5361 23.6792 18.4366 23.5432 18.2497C22.9664 17.4554 22.2364 16.6805 21.4233 15.9865C21.117 16.1526 20.7753 16.2844 20.4012 16.3784C19.3444 16.6441 18.0286 16.6062 16.7919 16.2744C14.7692 15.7313 13.6591 14.6446 13.964 13.506C14.1719 12.7299 14.7476 12.2176 15.5853 12.0631C17.0862 11.7859 19.3526 12.6928 21.4158 14.2115C21.5448 14.0369 21.6446 13.8344 21.7084 13.6011C22.2464 11.6258 21.3622 8.46952 19.4159 7.36095C19.0824 7.17112 18.9665 6.7476 19.157 6.41511C19.3474 6.08261 19.7722 5.96708 20.1057 6.15691C21.2739 6.82228 22.2237 8.05381 22.7797 9.62452C23.3014 11.0986 23.4001 12.6805 23.0506 13.964C22.9369 14.3809 22.751 14.7561 22.4995 15.0826C23.3099 15.7937 24.0559 16.5913 24.6697 17.4361C24.8951 17.7463 24.8254 18.1795 24.5143 18.4042C24.3909 18.4934 24.2482 18.5361 24.107 18.5361ZM16.1677 13.3986C16.0488 13.3986 15.9389 13.4075 15.8379 13.4261C15.4556 13.4967 15.3569 13.678 15.3073 13.8634C15.2991 13.8935 15.3576 14.0391 15.6162 14.2412C15.9646 14.5135 16.5251 14.7665 17.1529 14.9352C18.0297 15.1707 19.1994 15.2721 20.1444 15.0113C19.9093 14.8519 19.6708 14.7004 19.4301 14.5584C18.1844 13.8229 16.9778 13.3986 16.1673 13.3986H16.1677Z"
      fill="white"
    />
    <path
      d="M17.3715 5.16469C17.501 4.40453 16.4399 3.59082 15.0014 3.34722C13.5629 3.10362 12.2917 3.52238 12.1622 4.28254C12.0327 5.0427 13.0939 5.85641 14.5324 6.10001C15.9709 6.34361 17.242 5.92485 17.3715 5.16469Z"
      fill="white"
    />
    <path
      d="M14.45 4.41532C14.9862 4.77382 15.9711 4.24554 16.6485 3.23654C17.3267 2.22717 17.4411 1.1186 16.9045 0.760103C16.5461 0.521227 15.9879 0.676886 15.455 1.10783C15.4952 1.20516 15.5336 1.30621 15.5675 1.40986C15.9472 2.56375 15.7579 3.66191 15.1442 3.86289C14.8249 3.96766 14.4541 3.80865 14.1176 3.46873C14.083 3.89559 14.191 4.24257 14.4496 4.41532H14.45Z"
      fill="white"
    />
    <path
      d="M14.6978 4.21111C15.3114 4.01034 15.5008 2.91202 15.1209 1.75795C14.7409 0.60388 13.9355 -0.16892 13.3219 0.0318536C12.7084 0.232627 12.5189 1.33094 12.8988 2.48501C13.2788 3.63908 14.0842 4.41188 14.6978 4.21111Z"
      fill="white"
    />
    <path
      d="M13.5143 3.9662C13.6115 3.52408 13.3308 3.08712 12.8873 2.99024C12.4438 2.89335 12.0056 3.17323 11.9084 3.61535C11.8112 4.05748 12.0919 4.49443 12.5354 4.59132C12.9789 4.6882 13.4171 4.40833 13.5143 3.9662Z"
      fill="white"
    />
  </svg>
);

const Error: React.FC<IconProps> = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="65" height="65" rx="20" fill="#F06960" />
    <rect x="0.5" y="0.5" width="64" height="64" rx="19.5" stroke="#E75349" strokeOpacity="0.5" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5462 16.6863C17.7041 15.5284 19.5815 15.5284 20.7394 16.6863L48.4584 44.4053C49.6164 45.5632 49.6164 47.4406 48.4584 48.5986C47.3005 49.7565 45.4231 49.7565 44.2652 48.5986L16.5462 20.8796C15.3883 19.7216 15.3883 17.8443 16.5462 16.6863Z"
      fill="#ECEBEB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M16.5462 48.5983C15.3882 47.4404 15.3882 45.563 16.5462 44.4051L44.2652 16.6861C45.4231 15.5282 47.3005 15.5282 48.4584 16.6861C49.6164 17.8441 49.6164 19.7214 48.4584 20.8794L20.7394 48.5983C19.5815 49.7563 17.7041 49.7563 16.5462 48.5983Z"
      fill="#ECEBEB"
    />
  </svg>
);

const Timer: React.FC<IconProps> = ({ size = 50 }) => (
  <svg width={size} height={size} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="65" height="65" rx="19" fill="#EF685F" />
    <path d="M33 14C33 14 33 32 33 34C33 36 49 48.5 49 48.5" stroke="white" strokeWidth="6" strokeLinecap="round" />
  </svg>
);

const SelectArrow: React.FC<IconProps> = ({ size = 50, color }) => (
  <svg width={size} viewBox="0 0 7 5" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 1.25L3.5 3.75L6 1.25" stroke={color} />
  </svg>
);

const Plus: React.FC<IconProps> = ({ size = 12, color }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 0.428467V11.5713" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path d="M0.427734 5.96558H11.5706" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Confirm: React.FC<IconProps> = ({ size = 60 }) => (
  <svg width={size} height={size} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="65" height="65" rx="20" fill="#BBD95D" />
    <rect x="0.5" y="0.5" width="64" height="64" rx="19.5" stroke="#91AC58" strokeOpacity="0.5" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M11.7947 30.2386C12.9103 29.0399 14.7865 28.9726 15.9852 30.0883L26.7479 40.1057L49.0613 18.8199C50.2462 17.6895 52.1231 17.7338 53.2534 18.9187C54.3837 20.1036 54.3395 21.9804 53.1546 23.1108L28.9143 46.2348C27.7257 47.3686 25.8595 47.3801 24.6571 46.2609L11.945 34.4292C10.7463 33.3135 10.679 31.4373 11.7947 30.2386Z"
      fill="#ECEBEB"
    />
  </svg>
);

const Back: React.FC<IconProps> = ({ size = 12, color }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.42913 7.71436L4.71484 6.00007L6.42913 4.28578"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="0.5" y="0.5" width="11" height="11" rx="2.5" stroke={color} />
  </svg>
);

const LogOut: React.FC<IconProps> = ({ size = 12, color }) => (
  <svg width={size} height={size} viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.5 1.5H5.5C4.09987 1.5 3.3998 1.5 2.86502 1.77248C2.39462 2.01217 2.01217 2.39462 1.77248 2.86502C1.5 3.3998 1.5 4.09987 1.5 5.5V12.5C1.5 13.9001 1.5 14.6002 1.77248 15.135C2.01217 15.6054 2.39462 15.9878 2.86502 16.2275C3.3998 16.5 4.09987 16.5 5.5 16.5H6.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.3333 13.1667L16.5 9.00004M16.5 9.00004L12.3333 4.83337M16.5 9.00004H6.5"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const AvatarPlus: React.FC<IconProps> = ({ size = 33, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 33 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M11.2382 0.427845L15.9284 1.78405C16.2674 1.88208 16.6272 1.88283 16.9666 1.78621L21.7966 0.411303C22.6418 0.170715 23.5409 0.546916 23.963 1.31768L26.4694 5.89504C26.6375 6.20214 26.888 6.45626 27.1927 6.62883L31.1787 8.88671C31.9497 9.32347 32.3117 10.2389 32.0479 11.0849L30.6672 15.513C30.554 15.876 30.5534 16.2648 30.6655 16.6282L32.06 21.1493C32.3177 21.9849 31.9661 22.8879 31.2113 23.3292L26.768 25.9266C26.4649 26.1039 26.2173 26.3624 26.0534 26.673L23.9399 30.6768C23.531 31.4515 22.6418 31.8417 21.7948 31.6181L16.9314 30.3344C16.6141 30.2507 16.2804 30.2513 15.9635 30.3363L11.2488 31.6004C10.3822 31.8328 9.47213 31.4213 9.07421 30.6172L6.96789 26.3608C6.79108 26.0035 6.50542 25.7116 6.15206 25.5271L1.84775 23.2796C1.06147 22.869 0.668508 21.9652 0.904481 21.1102L2.1597 16.562C2.24855 16.24 2.25014 15.9002 2.16431 15.5775L0.876636 10.735C0.655154 9.90215 1.02762 9.02522 1.7808 8.60629L6.20271 6.1468C6.52438 5.96789 6.78654 5.69859 6.95674 5.37222L9.04628 1.36568C9.4606 0.571256 10.3774 0.178965 11.2382 0.427845Z"
      fill={color}
    />
    <path
      d="M16.5 10.75V21.25"
      stroke="var(--grey-dark)"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M11.25 16H21.75" stroke="var(--grey-dark)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Time: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M6.74916 11.5713C9.82622 11.5713 12.3206 9.07695 12.3206 5.9999C12.3206 2.92288 9.82622 0.428467 6.74916 0.428467C3.67215 0.428467 1.17773 2.92288 1.17773 5.9999C1.17773 9.07695 3.67215 11.5713 6.74916 11.5713Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M6.75 3.85693V5.99979L8.92714 8.53693" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Search: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.89202 9.85704C8.49565 9.85704 10.6063 7.74638 10.6063 5.14275C10.6063 2.53912 8.49565 0.428467 5.89202 0.428467C3.28839 0.428467 1.17773 2.53912 1.17773 5.14275C1.17773 7.74638 3.28839 9.85704 5.89202 9.85704Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M12.3203 11.5713L9.32031 8.57129" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Views: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="8" cy="6" r="2.5" stroke={color} />
    <path
      d="M15.3813 5.9929C15.082 6.39574 14.8162 6.7607 14.5688 7.10035C14.2672 7.51443 13.993 7.8909 13.7188 8.25259C13.1855 8.95593 12.725 9.5023 12.2317 9.93758C11.2811 10.7763 10.1539 11.252 7.99736 11.4971C5.62919 11.2519 4.37854 10.5464 3.41605 9.58395C2.91662 9.08451 2.48427 8.50525 2.00778 7.84129C1.94563 7.75468 1.88276 7.66668 1.81897 7.57741C1.46882 7.08729 1.09116 6.55869 0.653579 6.01043C1.14852 5.43802 1.58358 4.91726 1.97462 4.44919C2.17595 4.20821 2.3656 3.98119 2.54576 3.76828C3.14594 3.05898 3.64154 2.50516 4.14331 2.06242C5.10417 1.2146 6.11679 0.746293 8.00343 0.503569C10.1376 0.748791 11.395 1.33951 12.4178 2.2487C13.2949 3.02835 14.0098 4.04462 14.9419 5.36975C15.083 5.57031 15.229 5.77794 15.3813 5.9929Z"
      stroke={color}
    />
  </svg>
);

const Figma: React.FC<IconProps> = ({ size = 30 }) => (
  <svg width={size} viewBox="0 0 3000 3000" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fill="#0ACF83"
      d="M1083.333374,2750c230,0,416.666626-186.666748,416.666626-416.666748v-416.666626h-416.666626  c-230.000061,0-416.666687,186.666626-416.666687,416.666626S853.333313,2750,1083.333374,2750z"
    />
    <path
      fill="#A259FF"
      d="M666.666687,1500c0-230,186.666626-416.666748,416.666687-416.666748H1500v833.333374  h-416.666626C853.333313,1916.666626,666.666687,1730,666.666687,1500z"
    />
    <path
      fill="#F24E1E"
      d="M666.666687,666.666626C666.666687,436.666656,853.333313,250,1083.333374,250H1500  v833.333252h-416.666626C853.333313,1083.333252,666.666687,896.666626,666.666687,666.666626z"
    />
    <path
      fill="#FF7262"
      d="M1500,250h416.666626c230.000122,0,416.666626,186.666656,416.666626,416.666626  s-186.666504,416.666626-416.666626,416.666626H1500V250z"
    />
    <path
      fill="#1ABCFE"
      d="M2333.333252,1500c0,230-186.666504,416.666626-416.666626,416.666626S1500,1730,1500,1500  s186.666626-416.666748,416.666626-416.666748S2333.333252,1270,2333.333252,1500z"
    />
  </svg>
);

const Google: React.FC<IconProps> = ({ size = 24 }) => (
  <svg width={size} viewBox="-3 0 262 262" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"
      fill="#4285F4"
    />
    <path
      d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"
      fill="#34A853"
    />
    <path
      d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"
      fill="#FBBC05"
    />
    <path
      d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"
      fill="#EB4335"
    />
  </svg>
);

const Copy: React.FC<IconProps> = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M10 0.5H1.5C0.947715 0.5 0.5 0.947715 0.5 1.5V10C0.5 10.5523 0.947715 11 1.5 11H10C10.5523 11 11 10.5523 11 10V1.5C11 0.947715 10.5523 0.5 10 0.5Z"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M13.5 3.5V12.5C13.5 12.7652 13.3946 13.0196 13.2071 13.2071C13.0196 13.3946 12.7652 13.5 12.5 13.5H3.5"
      stroke="white"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Accordeon: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.856306 2.07138C1.093 2.07138 1.28488 1.8795 1.28488 1.6428C1.28488 1.40611 1.093 1.21423 0.856306 1.21423C0.619613 1.21423 0.427734 1.40611 0.427734 1.6428C0.427734 1.8795 0.619613 2.07138 0.856306 2.07138Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3.85547 1.64282H11.5698" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M0.856306 5.92855C1.093 5.92855 1.28488 5.73667 1.28488 5.49998C1.28488 5.26329 1.093 5.07141 0.856306 5.07141C0.619613 5.07141 0.427734 5.26329 0.427734 5.49998C0.427734 5.73667 0.619613 5.92855 0.856306 5.92855Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3.85547 5.5H11.5698" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
    <path
      d="M0.856306 9.78561C1.093 9.78561 1.28488 9.5937 1.28488 9.35704C1.28488 9.12038 1.093 8.92847 0.856306 8.92847C0.619613 8.92847 0.427734 9.12038 0.427734 9.35704C0.427734 9.5937 0.619613 9.78561 0.856306 9.78561Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M3.85547 9.35706H11.5698" stroke={color} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const AccordeonPlay: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.57087 4.28571L7.28516 5.99999L5.57087 7.71428"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <rect x="11.5" y="11.5" width="11" height="11" rx="2.5" transform="rotate(180 11.5 11.5)" stroke={color} />
  </svg>
);

const AccordeonArrow: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 9 6" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M0 5.25L9 5.25L4.5 0.75L0 5.25Z" fill={color} />
  </svg>
);

const Pen: React.FC<IconProps> = ({ size = 12, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M4.28488 10.4914L0.427734 11.5714L1.50773 7.71432L8.57059 0.685749C8.65039 0.60411 8.74579 0.539242 8.85096 0.494956C8.95622 0.450669 9.06928 0.427856 9.18345 0.427856C9.29762 0.427856 9.41068 0.450669 9.51593 0.494956C9.62111 0.539242 9.71651 0.60411 9.79631 0.685749L11.3134 2.21146C11.3938 2.29114 11.4575 2.38595 11.5011 2.49039C11.5446 2.59485 11.567 2.70688 11.567 2.82003C11.567 2.93319 11.5446 3.04522 11.5011 3.14967C11.4575 3.25413 11.3938 3.34893 11.3134 3.42861L4.28488 10.4914Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Done: React.FC<IconProps> = ({ size = 22, color }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M18.0003 0.856934H6.00028C3.15996 0.856934 0.857422 3.15948 0.857422 5.99979V17.9998C0.857422 20.8402 3.15996 23.1426 6.00028 23.1426H18.0003C20.8407 23.1426 23.1431 20.8402 23.1431 17.9998V5.99979C23.1431 3.15948 20.8407 0.856934 18.0003 0.856934Z"
      fill={color}
    />
    <path
      d="M17.0006 8.14258L10.1434 16.714L6.71484 14.1426"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Close: React.FC<IconProps> = ({ size = 20, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.47587 1.4749C2.63381 0.316961 4.5112 0.316961 5.66914 1.4749L33.3881 29.1939C34.546 30.3518 34.546 32.2292 33.3881 33.3871C32.2302 34.5451 30.3528 34.5451 29.1948 33.3871L1.47587 5.66816C0.317938 4.51022 0.317938 2.63284 1.47587 1.4749Z"
      fill={color}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M1.47587 33.3874C0.317937 32.2295 0.317937 30.3521 1.47587 29.1941L29.1948 1.47518C30.3528 0.317239 32.2302 0.317239 33.3881 1.47518C34.546 2.63311 34.546 4.5105 33.3881 5.66844L5.66914 33.3874C4.5112 34.5453 2.63381 34.5453 1.47587 33.3874Z"
      fill={color}
    />
  </svg>
);

const AccordeonPlaySession: React.FC<IconProps> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M5.01367 8.76443V5.23577C5.01367 4.82817 5.4881 4.57053 5.87415 4.76848L9.31508 6.5328C9.7123 6.73648 9.7123 7.26372 9.31508 7.46739L5.87415 9.23172C5.4881 9.42967 5.01367 9.17202 5.01367 8.76443Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0.609287 6.13916C0.577114 6.4001 0.560547 6.66587 0.560547 6.93552C0.560547 7.20516 0.577114 7.47094 0.609287 7.73188"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3.11523 1.7988C3.32513 1.64047 3.54701 1.49323 3.78053 1.35841C4.01405 1.22359 4.2525 1.10505 4.49457 1.00244"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M1.06836 4.42939C1.17096 4.18732 1.2895 3.94887 1.42433 3.71535C1.55915 3.48183 1.70638 3.25995 1.86472 3.05005"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M7.01233 0.5C10.5618 0.5 13.4392 3.41015 13.4392 7C13.4392 10.5899 10.5618 13.5 7.01233 13.5C4.56637 13.5 2.43954 12.1181 1.35352 10.0841"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Play: React.FC<IconProps> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M0.5 13.7484H0.499899L0.500101 13.7584C0.506795 14.0916 0.620066 14.4099 0.817624 14.6788C1.01215 14.9435 1.27975 15.1491 1.585 15.2819C1.8867 15.4261 2.22205 15.5 2.56 15.5C2.90186 15.5 3.24107 15.4244 3.54547 15.2768C3.55091 15.2742 3.5563 15.2715 3.56164 15.2686L14.4242 9.50909C14.7287 9.37876 14.9958 9.17484 15.1893 8.91091L15.1895 8.91074C15.3888 8.63871 15.5 8.31541 15.5 7.97841C15.5 7.6414 15.3888 7.31811 15.1895 7.04608L15.1893 7.04591C14.9957 6.78176 14.7282 6.57771 14.4235 6.4474L3.56028 0.730542L3.5454 0.723027C3.24099 0.57557 2.9018 0.5 2.56 0.5C2.22207 0.5 1.8867 0.573872 1.58496 0.718045C1.2798 0.850915 1.01219 1.05649 0.81762 1.32125C0.620082 1.59005 0.506796 1.90838 0.500101 2.24147L0.5 2.24147V2.25152V13.7484Z"
      stroke={color}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Pause: React.FC<IconProps> = ({ size = 14, color = 'currentColor' }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="2" width="2" height="14" rx="1" fill={color} />
    <rect x="10" width="2" height="14" rx="1" fill={color} />
  </svg>
);

const Question: React.FC<IconProps> = ({ size = 65 }) => (
  <svg width={size} height={size} viewBox="0 0 65 65" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M7.4905 59.9H57.7803C62.7832 59.9 65.8516 54.4178 63.2357 50.1535L37.5632 8.30387C35.0385 4.18825 29.0396 4.2438 26.5915 8.40548L1.97412 50.2551C-0.535556 54.5215 2.54064 59.9 7.4905 59.9Z"
      fill="#0d99ff"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M30.1161 25.1159C29.5583 25.5557 29.0765 26.2788 29.0765 27.4716C29.0765 28.6777 27.9401 29.6555 26.5382 29.6555C25.1364 29.6555 24 28.6777 24 27.4716C24 25.1392 25.0086 23.2185 26.6865 21.8957C28.3234 20.6051 30.4475 20 32.5 20C34.5525 20 36.6766 20.6051 38.3135 21.8957C39.9913 23.2185 41 25.1392 41 27.4716C41 28.0115 40.8538 28.5923 40.7114 29.0645C40.5554 29.5817 40.3407 30.166 40.0951 30.7787C39.6032 32.0062 38.9415 33.4605 38.2495 34.9255C37.6625 36.1684 37.0615 37.4042 36.5066 38.5452C35.7184 40.1659 35.0233 41.5954 34.5931 42.5823C34.1009 43.7117 32.6378 44.2839 31.3253 43.8604C30.0127 43.4369 29.3476 42.1781 29.8398 41.0487C30.2954 40.0034 31.0632 38.4234 31.892 36.7177C32.441 35.5876 33.0169 34.4025 33.5465 33.2811C34.2296 31.8349 34.8497 30.4682 35.2959 29.3549C35.5194 28.7973 35.6879 28.3313 35.7977 27.9672C35.8869 27.6716 35.9129 27.5208 35.9204 27.477C35.9233 27.4602 35.9235 27.4591 35.9235 27.4716C35.9235 26.2789 35.4417 25.5557 34.8839 25.1159C34.2852 24.6439 33.4283 24.3678 32.5 24.3677C31.5716 24.3677 30.7148 24.6439 30.1161 25.1159Z"
      fill="#ECEBEB"
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M32.2702 48.3135C33.7031 48.3135 34.8647 49.4693 34.8647 50.895V50.9182C34.8647 52.3439 33.7031 53.4997 32.2702 53.4997C30.8374 53.4997 29.6758 52.3439 29.6758 50.9182V50.895C29.6758 49.4693 30.8374 48.3135 32.2702 48.3135Z"
      fill="#ECEBEB"
    />
  </svg>
);

const Icon: React.FC<{ name: IconName } & IconProps> = ({ name, color = 'currentColor', ...props }) => {
  return (
    <>
      {name === 'logo' && <Logo color={color} {...props} />}
      {name === 'error' && <Error color={color} {...props} />}
      {name === 'timer' && <Timer color={color} {...props} />}
      {name === 'success' && <Confirm color={color} {...props} />}
      {name === 'select-arrow' && <SelectArrow color={color} {...props} />}
      {name === 'plus' && <Plus color={color} {...props} />}
      {name === 'play' && <Play color={color} {...props} />}
      {name === 'pause' && <Pause color={color} {...props} />}
      {name === 'back' && <Back color={color} {...props} />}
      {name === 'logout' && <LogOut color={color} {...props} />}
      {name === 'avatar_plus' && <AvatarPlus color={color} {...props} />}
      {name === 'time' && <Time color={color} {...props} />}
      {name === 'search' && <Search color={color} {...props} />}
      {name === 'notfound' && <NotFound color={color} {...props} />}
      {name === 'views' && <Views color={color} {...props} />}
      {name === 'copy' && <Copy color={color} {...props} />}
      {name === 'accordeon' && <Accordeon color={color} {...props} />}
      {name === 'accordeon-play-session' && <AccordeonPlaySession color={color} {...props} />}
      {name === 'accordeon-play' && <AccordeonPlay color={color} {...props} />}
      {name === 'accordeon-arrow' && <AccordeonArrow color={color} {...props} />}
      {name === 'pen' && <Pen color={color} {...props} />}
      {name === 'done' && <Done {...props} />}
      {name === 'close' && <Close {...props} />}
      {name === 'figma' && <Figma {...props} />}
      {name === 'google' && <Google {...props} />}
      {name === 'question' && <Question {...props} />}
    </>
  );
};

export default Icon;
