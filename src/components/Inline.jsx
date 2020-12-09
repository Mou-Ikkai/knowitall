const { React } = require('powercord/webpack');
const { Tooltip } = require('powercord/components');

export default class Inline extends React.Component {
	render() {
		const { original_text } = this.props;

		return (
			<Tooltip text="test" className="knital-tooltip">
				{original_text}
			</Tooltip>
		);
	}
}
