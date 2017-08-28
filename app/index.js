import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';//只会刷新新的状态并不会刷新页面
import Root from "./root";

render(
	<AppContainer>
		<Root />
	</AppContainer>,
	document.getElementById("root")
);

if(module.hot){
	module.hot.accept("./root",() => {
		const NewRoot = require("./root").default;
		render(
			<AppContainer>
				<NewRoot />
			</AppContainer>,
			document.getElementById("root")
		);
	});
}
