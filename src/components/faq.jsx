import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


export default function FAQ() {
    const [faqData, setFAQData] = useState(null)
    const params = useParams()

    useEffect(() => {
        async function getFAQData() {
            try {
                const faqResponse = await fetch(`http://localhost:3000/faq/${params.raceName}`);
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
                        return (<>
                            <p><strong>{item.question}</strong></p>
                            <p>{item.answer}</p>
                        </>)
                    })
                    }
                </>
            }
            <p>More questions? Get in touch with us here:</p>
        </>
    )
}