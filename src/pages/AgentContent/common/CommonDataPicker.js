import React, { PropTypes } from 'react';
import * as styles from './styles.css';
import { Modal, DatePicker, List } from 'antd-mobile';
import moment from 'moment';

const disabledStartDate = () => {
      const day = moment().format('DD');
      if (day >= 15) {
            // 本月
            return moment().format('YYYY-MM-01');
      }else {
          return moment().subtract(1, 'months').format('YYYY-MM-01');
      }
};
    


class CommonDataPicker extends React.PureComponent {
  constructor(props: Object) {
    super(props);
    this.state = {
      date1: '',
      date2: '',
    };
  }
  
  render() {
    return (
      <Modal
        visible={this.props.visible}
        transparent
        maskClosable={false}
        title="选择时间范围"
        footer={[
          { text: '确定', 
            onPress: () => { 
              this.props.submitAction(this.state.date1, this.state.date2);
              this.setState({
                date1: '',
                date2: '',
              });
            },
            style: { backgroundColor: '#de3c46', color: '#fff' }
          },
          { text: '取消',
            onPress: () => { 
              this.props.cancelAction();
              this.setState({
                date1: '',
                date2: '',
              });
            },
            style: { backgroundColor: '#5b5b5b', color: '#fff' }
          },
        ]}
        style={{ width: '98vw' }}
      >
        <div className={styles.ModalContent}>
          <DatePicker
            mode="date"
            title="选择开始时间"
            format={'YYYY-MM-DD'}
            onChange={(date) => {
              this.setState({ date1 : moment(date).format('YYYY-MM-DD') })
            }}
            value={new Date(this.props.dateTimeStart)}
            maxDate={new Date(moment())}
            minDate={new Date(disabledStartDate())}
          >
             <div className={styles.dataText}>{this.state.date1 || this.props.dateTimeStart}</div>
          </DatePicker>
          至
          <DatePicker
            mode="date"
            format={'YYYY-MM-DD'}
            title="选择结束时间"
            onChange={date => {
              this.setState({ date2 : moment(date).format('YYYY-MM-DD') })
            }}
            value={new Date(this.props.dateTimeEnd)}
            maxDate={new Date(moment())}
            minDate={new Date(this.state.date1 || this.props.dateTimeStart)}
          >
            <div className={styles.dataText}>{this.state.date2 || this.props.dateTimeEnd}</div>
          </DatePicker>
        </div>
      </Modal>       
    );
  }
}

export default CommonDataPicker;
