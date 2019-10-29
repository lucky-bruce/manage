import React, { useState, useEffect, useContext } from "react";
import Context from "../context/context";
import { Request } from "../../proto/chunker/chunker_pb";

export default function Img({ src, className, style, alt }) {
	const context = useContext(Context);
	const client = context.chunker;

	const [image, setImage] = useState("");
	const [loaded, setLoaded] = useState(false);

	function GetImage() {
		if (!src) {
			throw new Error("Src value must be specified");
		}
		let req = new Request();
		req.setUrl(src);

		var stream = client.chunker(req, {});
		stream.on("data", function(response) {
			setImage(image + response.toObject().chunk);
		});

		stream.on("end", function(end) {
			setLoaded(true);
		});
	}

	useEffect(() => {
		GetImage();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return loaded ? (
		<img
			className={className}
			style={style}
			alt={alt}
			src={`data:image/png;base64,${image}`}
		/>
	) : (
		""
	);
}
