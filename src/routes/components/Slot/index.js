import React, {useState, useEffect} from 'react';
import {/*makeStyles, Card, CardHeader, CardContent, Typography, Box, */Grid}from '@material-ui/core';
// import {NotificationManager} from 'react-notifications';

import PageContainer from '../../../@jumbo/components/PageComponents/layouts/PageContainer';
import GridContainer from '../../../@jumbo/components/GridContainer';
import IntlMessages from '../../../@jumbo/utils/IntlMessages';
import JackpotView from "../../components/Jackpot";
import GameCards from "../../components/GameCards";

import commonStyles from '../../../@jumbo/common/common.style';
// import clsx from 'clsx';

// import {CommonConstants} from "../Common/Constants";

const txt = {
    slots: {
        title: <IntlMessages id={'home.gameCategory.slotGame'}/>,
        subTitle: <IntlMessages id={'home.mostFavoriteSlotGames'}/>
    },
    baccarat: {
        title: <IntlMessages id={'home.gameCategory.baccaratGame'}/>,
        subTitle: <IntlMessages id={'home.mostFavoriteBaccaratGames'}/>
    }
};

const Slot = ({gameType, categoryList}) => {
    const commonClasses = commonStyles();

    const [jackpotAmount, setJackpotAmount] = useState(0);

    const setJackpot = () => {
        let commonInfo = localStorage.getItem('commonInfo') ? JSON.parse(localStorage.getItem('commonInfo')) : null;
        if (commonInfo) {
            setJackpotAmount(commonInfo.jackpotAmount);
        }
    };

    useEffect(() => {
        setJackpot();

        const interval = setInterval(() => {
            setJackpot();
        }, 1000);

        return () => clearInterval(interval);
    }, [jackpotAmount]);

    return (
        <PageContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <JackpotView jackpotAmount={jackpotAmount} style={commonClasses.goldBorder}/>
                </Grid>
            </GridContainer>
            <GridContainer>
                <Grid item xs={12} sm={12} md={12}>
                    <GameCards
                        categoryList={categoryList}
                        type={gameType}
                        title={txt[gameType].title}
                        subTitle={txt[gameType].subTitle}
                        icon={'iconfont icon-icon_lib_slots'}/>
                </Grid>
            </GridContainer>
        </PageContainer>
    );
}

export default Slot;