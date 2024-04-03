//Hooks
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
//Styles
import styles from './sponsors.module.css'

function SponsorItem({ sponsor }) {

    return (
        <div className={`${styles["sponsor-item"]} ${sponsor.tier === 'primary' ? styles['primary'] : ""}`}>
            {/* <p>{sponsor.name.toUpperCase()}</p> */}
            <a href={sponsor.linkURL && sponsor.linkURL.toLowerCase() !== 'null' ? `${sponsor.linkURL}` : ""}><img src={`${sponsor.imgURL}`} /></a>
        </div>
    )

}


export default function Sponsors() {
    const [sponsorInfo, setSponsorInfo] = useState(null)
    const { raceName } = useParams()

    useEffect(() => {
        async function getSponsorInfo() {
            let sponsorsResponse = await fetch(`${process.env.REACT_APP_SERVER}/sponsors/${raceName}`)
            let sponsorsData = await sponsorsResponse.json();
            setSponsorInfo(sponsorsData)
        }
        getSponsorInfo()
    }, [])

    return (
        <>
            {(sponsorInfo && sponsorInfo.filter(sponsor => sponsor.isActive).length > 0 ) &&
                <div className={`${styles["sponsor-container"]}`}>
                    {sponsorInfo.filter(sponsor => sponsor.tier.toLowerCase() === 'primary' && sponsor.isActive).length > 0 &&
                        <>
                            <h4>A big shoutout to this year's title sponsors!</h4>
                            <br />
                            <p>
                                <strong>{sponsorInfo.filter(sponsor => sponsor.tier.toLowerCase() === 'primary' && sponsor.isActive).map(sponsor => <><span>{sponsor.name}</span><br /></>)}</strong>
                            </p>
                            <div className={`${styles["sponsor-row"]} ${styles["primary-row"]}`}>
                                {sponsorInfo.filter(sponsor => sponsor.tier.toLowerCase() === 'primary' && sponsor.isActive).map(sponsor => <SponsorItem sponsor={sponsor} />)}
                            </div>
                            <br />
                        </>
                    }
                    {(sponsorInfo.filter(sponsor => sponsor.tier.toLowerCase() === 'primary' && sponsor.isActive).length > 0 && sponsorInfo.filter(sponsor => sponsor.tier.toLowerCase() === 'secondary' && sponsor.isActive).length > 0)  && <hr/>}
                    <div className={`${styles["sponsor-row"]} ${styles["secondary-row"]}`}>
                        {sponsorInfo.filter(sponsor => sponsor.tier.toLowerCase() === 'secondary' && sponsor.isActive).map(sponsor => <SponsorItem sponsor={sponsor} />)}
                    </div>
                </div>
            }
        </>
    )
}