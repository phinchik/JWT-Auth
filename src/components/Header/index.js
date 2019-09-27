import React, { Component } from 'react'
import styles from './index.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTooth } from '@fortawesome/free-solid-svg-icons'


class Header extends Component {
    render() {
        return <div className={styles.container}>
            <div className={styles.header}>
                Dr<FontAwesomeIcon icon={faTooth} className={styles.logo} />. Magat
            </div>
            {this.props.token && <div className={styles.logout} onClick={this.props.logout}>LOG OUT</div>}

        </div>
    }
}

export default Header;