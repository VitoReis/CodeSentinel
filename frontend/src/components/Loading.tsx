import styles from "./Loading.module.css"

export default function Loading() {

    return (
        <div className={ styles.Robot}>
            <div className={ styles.Ear }/>
            <div className={ styles.Neck }/>
            <div className={ styles.Head }>
                <div className={ styles.Forehead }>
                    <div className={ styles.Dots }/>
                    <div className={ styles.Lines }/>
                    <div className={ styles.Dots }/>
                </div>
                <div className={ styles.Eyes }>
                    <div className={`${styles.Eye} ${styles.EyeLeft}`}>
                        <div className={`${styles.Iris} ${styles.IrisLeft}`}/>
                    </div>
                    <div className={`${styles.Eye} ${styles.EyeRight}`}>
                        <div className={`${styles.Iris} ${styles.IrisRight}`}/>
                    </div>
                </div>
                <div className={ styles.Mouth }/>
                <div className={ styles.Lines }/>
            </div>
        </div>
    );
}