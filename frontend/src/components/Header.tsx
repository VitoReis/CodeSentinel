import styles from './Header.module.css'
import codeSentinel from '../images/codeSentinel.jpg';

export default function Header() {
    return(
        <div className={ styles.Header }>
            <img src={ codeSentinel } alt="Code Sentinel" className={ styles.Images }/> 
            <h1 className={ styles.Title }>Bem-vindo ao Code Sentinel</h1>
        </div>
    );
};