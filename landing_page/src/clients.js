import { LandingServiceClient } from "./proto/landing/landing_grpc_web_pb";

export function GetClients() {
  const ip = `${process.env.REACT_APP_SERVER_LOCAL_IP}:8080`;

  const landing = new LandingServiceClient(ip, null, null);

  return {
    landing
  };
}
