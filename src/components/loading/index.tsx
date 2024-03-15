import loading from './images/loading.gif';
import styles from './index.module.less';
import cns from 'classnames';

export default function Loading({ className }: {className?: string}) {

  return (
    <div className={cns(styles.modalOverlay, className)}>
      <div className={styles.maskTransparent}></div>
      <div className={styles.maskLoading}>
        <div>
          <img src={loading} alt="" /><br/>
          <span>正在加载中...</span>
        </div>
      </div>
    </div>
  );
}