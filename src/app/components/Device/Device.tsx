import Image from 'next/image';
import { Icon } from '../../components';
import css from './Device.module.scss';
import DeviceTime from './DeviceTime';

interface DeviceProps {
  url?: string | null;
}

const Device: React.FC<DeviceProps> = ({ url = null }) => {
  const transformUrl = (url: string): string => {
    const newUrl = url.replace('www.figma.com', 'embed.figma.com').split('&viewport');
    return `${newUrl}&scaling=fit-width&embed-host=share&hide-ui=1`;
  };

  return (
    <div className={css.Device}>
      <div className={css.Header}>
        <DeviceTime />
        <Icon name="device" />
      </div>
      <div className={css.Iframe}>
        {url ? (
          <iframe src={transformUrl(url)}></iframe>
        ) : (
          <Image src="/placeholder_mobil.webp" width="375" height="500" alt="uniux prototype" />
        )}
      </div>
      <div className={css.Footer}></div>
    </div>
  );
};

export default Device;
