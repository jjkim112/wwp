import { useNavigate } from 'react-router-dom';
import PokerCalPage from '../poker_cal/PokerCalPage';
import QuotePage from '../quote/QuotePage';
import { HeaderTap } from '../../utils/header/header_tap';
import { useState } from 'react';
import PreFlopRangePage from '../pre_flop_range/PreFlopRangePage';
import HandRankPage from '../hand_rank/HandRankPage';
import { type } from 'os';
import HomePage from '../home/HomePage';
import HandRankings from './poker_hand_rankings/HandRankings';
import HoldemPubBase from './holdem_pub_base/HoldemPubBase';
import HoldemTermsBase from './terms_base/HoldemTermsBase';
type Section = {
  label: string;
};

function HoldemBase() {
  const tabs: Section[] = [
    {
      label: '홀덤 펍 방문시',
    },
    {
      label: '홀덤 용어 정리',
    },
    {
      label: '핸드 순위',
    },

    {
      label: '프리플랍 핸드',
    },
    {
      label: '포커(족보) 랭킹',
    },
  ];
  const [activeHeaderTab, setActiveHeaderTab] = useState(0);
  return (
    <div>
      <HeaderTap content={tabs} activeTab={setActiveHeaderTab} />
      <HoldemBaseSel sel={`${tabs[activeHeaderTab].label}`}></HoldemBaseSel>
    </div>
  );
}
type selProps = {
  sel: string;
};

export function HoldemBaseSel({ sel }: selProps): JSX.Element {
  console.log(sel);

  switch (sel) {
    case '핸드 순위':
      return <HandRankPage></HandRankPage>;

    case '프리플랍 핸드':
      return <PreFlopRangePage></PreFlopRangePage>;
    case '포커(족보) 랭킹':
      return <HandRankings></HandRankings>;
    case '홀덤 펍 방문시':
      return <HoldemPubBase></HoldemPubBase>;
    case '홀덤 용어 정리':
      return <HoldemTermsBase></HoldemTermsBase>;

    default:
      return <div>페이지 없습니다</div>;
  }
}

export default HoldemBase;
