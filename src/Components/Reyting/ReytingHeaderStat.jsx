function ReytingHeaderStat(props) {

    const row = props.stat;

    if (props.filter !== "all" && props.filter !== null)
        return null;

    return (
        <div className="reyting-row color-white shadow-sm">

            <div className="reyting-row-content d-flex justify-content-center align-items-center">

                <div className="text-center mx-3 my-2">
                    <div>Все заявки</div>
                    <div><strong>{row.sumZayavok}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Заявки Москва</div>
                    <div><strong>{row.mosReq}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Приходы</div>
                    <div><strong>{row.prihod}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>Приходы в день</div>
                    <div><strong>{row.comingPerDay}</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>КПД</div>
                    <div><strong>{row.kpd}%</strong></div>
                </div>

                <div className="text-center mx-3 my-2">
                    <div>План</div>
                    <div><strong>{props.plan}</strong></div>
                </div>

            </div>

        </div>
    )

}

export default ReytingHeaderStat