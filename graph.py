def findShortestPath():
    from collections import deque
    graph = {
            "Campinas": ["Valinhos", "Paulínia", "Hortolândia"],
            "Valinhos": ["Campinas", "Vinhedo", "Indaiatuba"],
            "Paulínia": ["Campinas", "Sumaré"],
            "Hortolândia": ["Campinas", "Sumaré", "Monte Mor"],
            "Sumaré": ["Paulínia", "Hortolândia", "Americana", "Nova Odessa"],
            "Monte Mor": ["Hortolândia", "Indaiatuba"],
            "Indaiatuba": ["Monte Mor", "Valinhos"],
            "Vinhedo": ["Valinhos"],
            "Americana": ["Sumaré", "Nova Odessa"],
            "Nova Odessa": ["Americana", "Sumaré"]
        }

    search_q = deque([("Vinhedo", ["Vinhedo"])])
    end = "Paulínia"
    count = 0
    seen = []
    while search_q:
        cur = search_q.popleft()
        if cur in seen:
            continue
        seen.append(cur)
        print(f" -> {cur}")
        if cur[0] == end:
            print("Chegamos")
            return
        search_q += (graph[cur[0]], )


findShortestPath()