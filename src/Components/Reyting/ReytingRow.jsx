import React from 'react';
import Icon from './../../Utils/FontAwesomeIcon'
import ReytingNach from './ReytingNach'

function ReytingRow(props) {

    const row = props.row;
    const [show, setShow] = React.useState(false);

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

    const opened = show
        ? "d-block"
        : "d-none"

    const animate = show
        ? "show-more show-more-open"
        : "show-more show-more-close"

    const nachStat = row.nachStat
        ? <ReytingNach stat={row.nachStat} zpNach={row.zpNach} kassaMonth={row.kassaMonth} plan={plan} row={row} />
        : null

    const mb = row.myRow ? 'mb-4' : ''

    return (
        <div className={`reyting-row color-${row.color} ${mb} shadow-sm`}>

            {nachStat}

            <div className="reyting-row-content d-flex justify-content-start align-items-center">

                <div className="row-pin">
                    <div className="font-weight-bold">{row.pin}</div>
                    {row.sector ? <div>{row.sector}</div> : null}
                </div>

                <div className="row-name">
                    <div className="text-nowrap"><strong>{row.fullName}</strong></div>
                    <div className="text-nowrap">???????????????? <b>{row.nagruzka}</b> ??????</div>
                    <div className="text-nowrap">???????????? <b>{row.sumZayavok} ({row.mosReq})</b></div>
                    <div className="text-nowrap">?????????????? <b>{row.prihod}</b> ?? {row.zpPercent} = {row.zpZayavky} ??????</div>
                    <div className="text-nowrap">?? ???????? <b>{Number(row.comingPerDay).toFixed(1)}</b></div>
                    <div className="text-nowrap">?????????????????? <b>{row?.agreements?.firsts || 0}</b></div>
                </div>

                <div className="row-kpd text-center">
                    <div className="d-flex text-nowrap"><span className="mr-1">?????? ????????.</span><strong>{Number(row.kpdComing).toFixed(2)}%</strong></div>
                    <div className="d-flex text-nowrap"><span className="mr-1">?????? ??????.</span><strong>{Number(row.kpdAgreements || 0).toFixed(2)}%</strong></div>
                    {row.mesto ? <div><small>{row.mesto} ??????????</small></div> : null}
                </div>

                <div className="row-money text-center">
                    <div><strong>{row.zpZayavky}</strong> ??????</div>
                    <div>{row.premia} ??????</div>
                </div>

                <div className="row-money-data flex-grow-1 px-2">

                    <div className="font-weight-bold">??????????????????</div>

                    <div className="d-flex">

                        <div className="flex-fill">
                            <div>???? ????????????</div>
                            <div className="row-more-info">??????????????: {row.zpZayavky || 0} ??????</div>
                            <div className="row-more-info">????????????????: {row.zpDogovory || 0} ??????</div>
                            <div className="row-more-info">?????????? ???? ??????????????: {row.prihodBonus || 0} ??????</div>
                            <div className="row-more-info">?????????? ???? ????????????: {row.bonusReviews || 0} ??????</div>
                        </div>

                        <div className="flex-fill">
                            <div>???? ????????????</div>
                            <div className="row-more-info">??????????: {row.kassa || 0} ??????</div>
                            <div className="row-more-info">?????????? ??????????: {row.kassaPercent || 0} ??????</div>
                            <div className="row-more-info">?????????? ??????: {row.okk || 0} ??????</div>
                        </div>

                    </div>

                </div>

                <div>
                    <Icon icon={['fas','chevron-up']}  title="???????????????? ??????????????????????" data-id={row.pin} data-open={opened === "d-none" ? 0 : 1} onClick={() => setShow(p => !p)} className={animate} />
                </div>

            </div>

            <div className={opened}>

                <hr />

                <table className="table table-borderless table-sm">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">????????</th>
                            <th scope="col" className="text-center">?????? ????????????</th>
                            <th scope="col" className="text-center">???????????? ????????????</th>
                            <th scope="col" className="text-center">??????????????</th>
                            <th scope="col" className="text-center">?????????? ???? ????????????</th>
                            <th scope="col" className="text-center">?????????? ???? ??????????????</th>
                        </tr>
                    </thead>
                    <tbody>{printMore}</tbody>
                </table>

            </div>

        </div>
    )

}

export default ReytingRow