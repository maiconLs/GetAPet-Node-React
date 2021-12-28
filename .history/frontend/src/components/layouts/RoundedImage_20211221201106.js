import styles from './RoundedImage.module.css'

function RoundedImage({ src, alt, width }) {
  return (
    <div>
    <img
      className={`${styles.rounded_image} ${styles[width]}`}
      src={src}
      alt={alt}
    />
    </div>
  )
}

export default RoundedImage