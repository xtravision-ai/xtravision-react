// # 1. getOnDemandSessionId() => session_id
// # 2. /wss/ondemand/{session_id}/{category}
// # 3. getOnDemandStats(session_id) => statsData

import { useCallback, useEffect, useRef } from "react";
import { ClassCategory } from "../constants";

export default function useOnDemandSocket(
  category: ClassCategory,
  features: any
) {}
