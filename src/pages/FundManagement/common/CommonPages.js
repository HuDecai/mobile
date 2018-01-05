import React, { PropTypes } from 'react';
import { ListView, Pagination, Icon } from 'antd-mobile';

class CommonPages extends React.PureComponent {
  render() {
    return (
      <Pagination
        total={this.props.total}
        className="custom-pagination-with-icon"
        current={this.props.current}
        locale={{
          prevText: (
             <span className="arrow-align"
                onClick={() => {
                  if(this.props.current > 1) {
                    this.props.prevAction();
                  }
                }}
             >上一页</span>),
          nextText: (
            <span className="arrow-align"
            onClick={() => {
              if(this.props.current < this.props.total) {
                 this.props.nextAction();
              }
            }}
          >下一页</span>),
        }}
      />
    );
  }
}

export default CommonPages