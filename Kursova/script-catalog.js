const bikes = [
            { id: 1, name: 'Mountain Pro X1', category: 'mountain', price: 1299, image: 'images/catalog1.webp' },
            { id: 2, name: 'City Cruiser Elite', category: 'city', price: 899, image: 'images/catalog2.webp' },
            { id: 3, name: 'Road Racer 500', category: 'road', price: 1599, image: 'images/catalog3.webp' },
            { id: 4, name: 'Electric Wave', category: 'electric', price: 2199, image: 'images/catalog4.webp' },
            { id: 5, name: 'Trail Blazer', category: 'mountain', price: 1499, image: 'images/catalog5.webp' },
            { id: 6, name: 'Urban Commuter', category: 'city', price: 749, image: 'images/catalog6.webp' },
            { id: 7, name: 'Speed Demon', category: 'road', price: 1899, image: 'images/catalog7.webp' },
            { id: 8, name: 'E-Mountain Beast', category: 'electric', price: 2499, image: 'images/catalog8.webp' },
        ];

        const categoryNames = {
            mountain: 'Гірський',
            city: 'Міський',
            road: 'Шосейний',
            electric: 'Електро'
        };

        function renderBikes(bikesToRender) {
            const grid = document.getElementById('bikesGrid');
            grid.innerHTML = '';

            bikesToRender.forEach(bike => {
                const card = document.createElement('div');
                card.className = 'bike-card';
                card.innerHTML = `
                    <img src="${bike.image}" alt="${bike.name}" class="bike-image">
                    <div class="bike-info">
                        <h3 class="bike-name">${bike.name}</h3>
                        <span class="bike-category">${categoryNames[bike.category]}</span>
                        <div class="bike-price">$${bike.price}</div>
                        <button class="bike-btn">Детальніше</button>
                    </div>
                `;
                grid.appendChild(card);
            });
        }

        function filterBikes() {
            const category = document.getElementById('categoryFilter').value;
            const priceRange = document.getElementById('priceFilter').value;

            let filtered = bikes;

            if (category !== 'all') {
                filtered = filtered.filter(bike => bike.category === category);
            }

            if (priceRange !== 'all') {
                if (priceRange === '2000+') {
                    filtered = filtered.filter(bike => bike.price >= 2000);
                } else {
                    const [min, max] = priceRange.split('-').map(Number);
                    filtered = filtered.filter(bike => bike.price >= min && bike.price < max);
                }
            }

            renderBikes(filtered);
        }

        function showPage(pageId, button) {
            document.querySelectorAll('.page').forEach(page => {
                page.classList.remove('active');
            });
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active');
            });

            document.getElementById(pageId).classList.add('active');
            button.classList.add('active');
        }

        document.addEventListener('DOMContentLoaded', function() {
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.onclick = function() {
                    const pageId = this.getAttribute('onclick').match(/'([^']+)'/)[1];
                    showPage(pageId, this);
                };
            });
            renderBikes(bikes);
        });

        function handleSubmit(event) {
            event.preventDefault();
            alert('Повідомлення відправлено!');
        }