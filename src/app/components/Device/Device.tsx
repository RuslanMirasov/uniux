import Image from 'next/image';
import { Icon, Preloader } from '../../components';
import css from './Device.module.scss';
import { createFigmaEmbedUrl } from '@/lib/figma/createFigmaEmbedUrl';
import DeviceTime from './DeviceTime';

interface DeviceProps {
  url?: string | null;
  loading?: boolean;
}

const Device: React.FC<DeviceProps> = ({ url = null, loading = false }) => {
  return (
    <div className={css.Device}>
      <div className={css.Header}>
        <DeviceTime />
        <Icon name="device" />
      </div>
      <div className={css.Iframe}>
        {url ? (
          <iframe src={createFigmaEmbedUrl(url)}></iframe>
        ) : (
          <Image src="/placeholder_mobil.webp" width="375" height="500" alt="uniux prototype" />
        )}
        {loading && (
          <div className={css.DeviceLoading}>
            <Preloader />
          </div>
        )}
      </div>
      <div className={css.Footer}></div>
    </div>
  );
};

export default Device;
