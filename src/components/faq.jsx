//Hooks
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
//Styles
import styles from "./faq.module.css"


export default function FAQ() {
    const [faqData, setFAQData] = useState(null)
    const params = useParams()

    useEffect(() => {
        async function getFAQData() {
            try {
                const faqResponse = await fetch(`${process.env.REACT_APP_SERVER}/faq/${params.raceName}`);
                const faqJSON = await faqResponse.json();
                setFAQData(faqJSON)
            } catch (error) {
                setFAQData([])
                console.error(error)
            }
        }
        getFAQData()
    }, [])

    return (
        <>
            {faqData &&
                <>
                    {faqData.map(item => {
                        return (<details className={`${styles["faq-details"]}`}>
                            <summary><strong>{item.question}</strong></summary>
                            {item.answer}
                        </details>)
                    })
                    }
                </>
            }
        </>
    )
}