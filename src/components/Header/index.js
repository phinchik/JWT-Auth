import React, { Component } from 'react'
import styles from './index.module.scss'


class Header extends Component {
    render() {
        return <div className={styles.container}>
            <div className={styles.header}>
                Jwt-Auth Project
            </div>
            {this.props.token && <div className={styles.logout} onClick={this.props.logout}>LOG OUT</div>}

        </div>
    }
}

export default Header;