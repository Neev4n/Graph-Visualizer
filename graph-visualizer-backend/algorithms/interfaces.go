package algorithms

type Node struct {
	ID      int  `json:"id"`
	X       int  `json:"x"`
	Y       int  `json:"y"`
	Visited bool `json:"visited"`
	Current bool `json:"current"`
}

type Edge struct {
	From int `json:"from"`
	To   int `json:"to"`
}

type GraphRequest struct {
	Nodes []Node `json:"nodes"`
	Edges []Edge `json:"edges"`
}

type GraphStep struct {
	NodeID  int  `json:"nodeId"`
	Visited bool `json:"visited"`
	Current bool `json:"current"`
	FromID  int  `json:"fromId"`
}

type GraphResponse struct {
	Steps []GraphStep `json:"steps"`
}
