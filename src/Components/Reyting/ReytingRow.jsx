import Icon from './../../Utils/FontAwesomeIcon'
import ReytingNach from './ReytingNach'

function ReytingRow(props) {

    const row = props.row;

    const plan = props.filter !== "all" && props.filter !== null
        ? props.plan
        : null

    const printMore = row.printMore.map((more, key) => {
        return <tr key={key}>
            <td className="text-center">{more.date}</td>
            <td className={`text-center ${more.sumZayavok === 0 ? 'text-muted-my' : 'font-weight-bold'}`}>{more.sumZayavok}</td>
            <td className={`text-center ${more.mosReq === 0 ? 'text-muted-my' : 'font-weight-bold'}`}>{more.mosReq}</td>
            <td className={`text-center ${more.prihod === 0 ? 'text-muted-my' : 'font-weight-bold'}`}>{more.prihod}</td>
            <td className={`text-center ${more.bonusReviews === 0 ? 'text-muted-my' : 'font-weight-bold'}`}>{more.bonusReviews}</td>
            <td className={`text-center ${more.prihodBonus === 0 ? 'text-muted-my' : 'font-weight-bold'}`}>{more.prihodBonus}</td>
        </tr>
    });

    const opened = props.opened.indexOf(row.pin) >= 0
        ? "d-block"
        : "d-none"

    const animate = props.opened.indexOf(row.pin) >= 0
        ? "show-more show-more-open"
        : "show-more show-more-close"

    const nachStat = row.nachStat
        ? <ReytingNach stat={row.nachStat} zpNach={row.zpNach} kassaMonth={row.kassaMonth} plan={plan} />
        : null

    return (
        <div className={`reyting-row color-${row.color} shadow-sm`}>

            {nachStat}

            <div className="reyting-row-content d-flex justify-content-start align-items-center">

                <div className="row-pin">
                    <div className="font-weight-bold">{row.pin}</div>
                    {row.sector ? <div>{row.sector}</div> : null}
                </div>

                <div className="row-name">
                    <div><strong>{row.fullName}</strong></div>
                    <div>Нагрузка {row.nagruzka} руб</div>
                    <div>Заявки - {row.sumZayavok} ({row.mosReq})</div>
                    <div>Приходы: {row.prihod} × {row.zpPercent} = {row.zpZayavky} руб</div>
                    <div>В день: {Number(row.comingPerDay).toFixed(0)}</div>
                </div>

                <div className="row-kpd text-center">
                    <div>КПД <strong>{Number(row.kpdComing).toFixed(2)}%</strong></div>
                    {row.mesto ? <div><small>{row.mesto} место</small></div> : null}
                </div>

                <div className="row-money text-center">
                    <div><strong>{row.zpZayavky}</strong> руб</div>
                    <div>{row.premia} руб</div>
                </div>

                <div className="row-money-data flex-grow-1 px-2">

                    <div className="font-weight-bold">Начислено</div>

                    <div className="d-flex">

                        <div className="flex-fill">
                            <div>За неделю</div>
                            <div className="row-more-info">Приходы: {row.zpZayavky || 0} руб</div>
                            <div className="row-more-info">Договоры: {row.zpDogovory || 0} руб</div>
                            <div className="row-more-info">Бонус за приходы: {row.prihodBonus || 0} руб</div>
                            <div className="row-more-info">Бонус за отзывы: {row.bonusReviews || 0} руб</div>
                        </div>

                        <div className="flex-fill">
                            <div>За период</div>
                            <div className="row-more-info">Касса: {row.kassa || 0} руб</div>
                            <div className="row-more-info">Бонус кассы: {row.kassaPercent || 0} руб</div>
                            <div className="row-more-info">Бонус ОКК: {row.okk || 0} руб</div>
                        </div>

                    </div>

                </div>

                <div>
                    <Icon icon={['fas','chevron-up']}  title="Смотреть подробности" data-id={row.pin} data-open={opened === "d-none" ? 0 : 1} onClick={props.showMore} className={animate} />
                </div>

            </div>

            <div className={opened}>

                <hr />

                <table className="table table-borderless table-sm">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Дата</th>
                            <th scope="col" className="text-center">Все заявки</th>
                            <th scope="col" className="text-center">Заявки Москва</th>
                            <th scope="col" className="text-center">Приходы</th>
                            <th scope="col" className="text-center">Бонус за отзывы</th>
                            <th scope="col" className="text-center">Бонус за приходы</th>
                        </tr>
                    </thead>
                    <tbody>{printMore}</tbody>
                </table>

            </div>

        </div>
    )

}

export default ReytingRow