package financial

func MapToSectorSlice(m map[string]float32) []*SectorProfit {
	var sectorProfit []*SectorProfit
	for k, v := range m {
		var p SectorProfit
		p.Name = k
		p.Amount = v

		sectorProfit = append(sectorProfit, &p)
	}

	return sectorProfit
}
