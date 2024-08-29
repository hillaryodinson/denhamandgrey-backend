import React from "react";

function PrintJSON(value: any) {
	return (
		<div className="flex flex-col text-xs">
			{JSON.stringify(value, null, 2)}
		</div>
	);
}

export default PrintJSON;
