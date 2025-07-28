import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

export default function Index() {
  const [selectedItem, setSelectedItem] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    { id: 1, user: 'Продавец', message: 'Привет! Интересуешься этим предметом?', time: '14:32' },
    { id: 2, user: 'Вы', message: 'Да, какая цена?', time: '14:33' }
  ]);
  const [newMessage, setNewMessage] = useState('');
  
  // Global chat state
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [globalChatMessages, setGlobalChatMessages] = useState([
    { id: 1, user: 'ProGamer123', avatar: 'PG', message: 'Ищу AK-47 Redline до 2000 рублей', time: '14:20', online: true },
    { id: 2, user: 'ClashMaster', avatar: 'CM', message: 'Продаю аккаунт ТХ14, все вопросы в личку', time: '14:25', online: true },
    { id: 3, user: 'BrawlPro', avatar: 'BP', message: 'Кто знает когда будет скидка на гемы в Brawl Stars?', time: '14:28', online: false },
    { id: 4, user: 'DotaKing', avatar: 'DK', message: 'Обменяю Драконий Коготь на скины CS2', time: '14:30', online: true },
    { id: 5, user: 'SpaceLord', avatar: 'SL', message: 'Всем привет! Новичок тут, как лучше продавать?', time: '14:35', online: true }
  ]);
  const [globalNewMessage, setGlobalNewMessage] = useState('');
  
  // Trading system state
  const [offerPrice, setOfferPrice] = useState('');
  const [offers, setOffers] = useState({});
  const [selectedItemForOffer, setSelectedItemForOffer] = useState(null);
  
  const onlineUsers = [
    { name: 'ProGamer123', avatar: 'PG', status: 'Торгует' },
    { name: 'ClashMaster', avatar: 'CM', status: 'В игре' },
    { name: 'DotaKing', avatar: 'DK', status: 'Онлайн' },
    { name: 'SpaceLord', avatar: 'SL', status: 'Продает' }
  ];

  const gameItems = [
    {
      id: 1,
      name: 'AK-47 | Redline',
      price: 2500,
      rarity: 'Запрещённое',
      game: 'CS2',
      image: '/placeholder.svg',
      seller: 'ProGamer123',
      condition: 'Немного поношенное'
    },
    {
      id: 2,
      name: 'Драконий Коготь',
      price: 1200,
      rarity: 'Эпическое',
      game: 'Dota 2',
      image: '/placeholder.svg',
      seller: 'DotaKing',
      condition: 'Новое'
    },
    {
      id: 3,
      name: 'Космический меч',
      price: 3500,
      rarity: 'Легендарное',
      game: 'StarCraft',
      image: '/placeholder.svg',
      seller: 'SpaceLord',
      condition: 'Отличное'
    }
  ];

  const supercellItems = [
    {
      id: 4,
      name: 'Мега Рыцарь',
      price: 890,
      rarity: 'Легендарная',
      game: 'Clash Royale',
      image: '/placeholder.svg',
      seller: 'ClashMaster',
      condition: 'Максимальный уровень',
      type: 'Карта'
    },
    {
      id: 5,
      name: 'Аккаунт ТХ14',
      price: 4500,
      rarity: 'Эпический',
      game: 'Clash of Clans',
      image: '/placeholder.svg',
      seller: 'ClanLeader',
      condition: 'Полностью прокачан',
      type: 'Аккаунт'
    },
    {
      id: 6,
      name: 'Леон + скин',
      price: 1800,
      rarity: 'Мифическая',
      game: 'Brawl Stars',
      image: '/placeholder.svg',
      seller: 'BrawlPro',
      condition: 'Сила 11',
      type: 'Боec'
    },
    {
      id: 7,
      name: 'Принцесс + Лог',
      price: 650,
      rarity: 'Легендарная',
      game: 'Clash Royale',
      image: '/placeholder.svg',
      seller: 'RoyaleKing',
      condition: '2 легендарки',
      type: 'Комбо'
    },
    {
      id: 8,
      name: 'Спайк Сакура',
      price: 2200,
      rarity: 'Мифическая',
      game: 'Brawl Stars',
      image: '/placeholder.svg',
      seller: 'SuperBrawler',
      condition: 'Редкий скин',
      type: 'Боец + скин'
    },
    {
      id: 9,
      name: 'База ТХ13 + гемы',
      price: 3200,
      rarity: 'Эпический',
      game: 'Clash of Clans',
      image: '/placeholder.svg',
      seller: 'GemMaster',
      condition: '10к гемов',
      type: 'Аккаунт'
    }
  ];

  const sendMessage = () => {
    if (newMessage.trim()) {
      setChatMessages([...chatMessages, { 
        id: chatMessages.length + 1, 
        user: 'Вы', 
        message: newMessage, 
        time: new Date().toLocaleTimeString().slice(0, 5)
      }]);
      setNewMessage('');
    }
  };

  const sendGlobalMessage = () => {
    if (globalNewMessage.trim()) {
      setGlobalChatMessages([...globalChatMessages, { 
        id: globalChatMessages.length + 1, 
        user: 'Вы', 
        avatar: 'Y',
        message: globalNewMessage, 
        time: new Date().toLocaleTimeString().slice(0, 5),
        online: true
      }]);
      setGlobalNewMessage('');
    }
  };

  const makeOffer = (itemId, price) => {
    const newOffer = {
      id: Date.now(),
      itemId,
      price: parseInt(price),
      time: new Date().toLocaleTimeString().slice(0, 5),
      status: 'pending'
    };
    
    setOffers(prev => ({
      ...prev,
      [itemId]: [...(prev[itemId] || []), newOffer]
    }));
    
    setOfferPrice('');
    setSelectedItemForOffer(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Header */}
      <header className="border-b border-white/10 backdrop-blur-sm bg-white/5">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <h1 className="text-2xl font-bold text-white bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                GameMarket
              </h1>
              <div className="hidden md:flex space-x-6">
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Главная</a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Каталог</a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Продать</a>
                <a href="#" className="text-white hover:text-blue-400 transition-colors">Помощь</a>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input 
                  placeholder="Поиск предметов..." 
                  className="w-64 bg-white/10 border-white/20 text-white placeholder:text-white/70"
                />
                <Icon name="Search" className="absolute right-3 top-3 h-4 w-4 text-white/70" />
              </div>
              <Avatar>
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 text-center animate-fade-in">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-bold text-white mb-6 animate-slide-up">
            Торгуй игровыми предметами
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto animate-slide-up">
            Безопасная торговая площадка для игровых предметов с мгновенными сделками и встроенным чатом
          </p>
          <div className="flex justify-center space-x-4 animate-scale-in">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 text-lg">
              Начать торговать
            </Button>
            <Button variant="outline" className="border-white/30 text-white hover:bg-white/10 px-8 py-3 text-lg">
              Узнать больше
            </Button>
          </div>
        </div>
      </section>



      {/* Featured Items */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h3 className="text-3xl font-bold text-white mb-12 text-center">Популярные предметы</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gameItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <Badge variant="secondary" className="mb-2">
                      {item.game}
                    </Badge>
                    <Badge 
                      className={`
                        ${item.rarity === 'Запрещённое' ? 'bg-red-500' : ''}
                        ${item.rarity === 'Эпическое' ? 'bg-purple-500' : ''}
                        ${item.rarity === 'Легендарное' ? 'bg-orange-500' : ''}
                      `}
                    >
                      {item.rarity}
                    </Badge>
                  </div>
                  <div className="w-full h-32 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg mb-4 flex items-center justify-center">
                    <Icon name="Gamepad2" size={48} className="text-white/50" />
                  </div>
                  <CardTitle className="text-white">{item.name}</CardTitle>
                  <CardDescription className="text-white/70">
                    Состояние: {item.condition}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-green-400">₽{item.price}</span>
                    <span className="text-white/70">от {item.seller}</span>
                  </div>
                  
                  {/* Offers */}
                  {offers[item.id] && offers[item.id].length > 0 && (
                    <div className="mt-4 p-3 bg-white/5 rounded-lg">
                      <h4 className="text-white text-sm font-medium mb-2">Предложения:</h4>
                      <div className="space-y-1">
                        {offers[item.id].slice(-2).map((offer) => (
                          <div key={offer.id} className="flex justify-between items-center text-xs">
                            <span className="text-white/70">₽{offer.price}</span>
                            <Badge variant="outline" className="text-xs">
                              {offer.status === 'pending' ? 'Ожидает' : offer.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600">
                    Купить
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-orange-400/50 text-orange-400 hover:bg-orange-400/10">
                        <Icon name="HandCoins" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Предложить цену</DialogTitle>
                        <DialogDescription className="text-white/70">
                          Предложите свою цену за "{item.name}"
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="text-center p-4 bg-white/5 rounded-lg">
                          <div className="text-white/70 text-sm">Текущая цена</div>
                          <div className="text-2xl font-bold text-green-400">₽{item.price}</div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-white text-sm font-medium">Ваше предложение</label>
                          <Input
                            type="number"
                            value={offerPrice}
                            onChange={(e) => setOfferPrice(e.target.value)}
                            placeholder="Введите цену..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/50"
                          />
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button 
                            onClick={() => makeOffer(item.id, offerPrice)}
                            disabled={!offerPrice || parseInt(offerPrice) <= 0}
                            className="flex-1 bg-orange-600 hover:bg-orange-700"
                          >
                            Отправить предложение
                          </Button>
                        </div>
                        
                        {offers[item.id] && offers[item.id].length > 0 && (
                          <div className="mt-4 p-3 bg-white/5 rounded-lg">
                            <h4 className="text-white text-sm font-medium mb-2">Ваши предложения:</h4>
                            <div className="space-y-2">
                              {offers[item.id].map((offer) => (
                                <div key={offer.id} className="flex justify-between items-center">
                                  <span className="text-white/70">₽{offer.price}</span>
                                  <div className="flex items-center space-x-2">
                                    <span className="text-xs text-white/50">{offer.time}</span>
                                    <Badge 
                                      variant="outline" 
                                      className={`text-xs ${
                                        offer.status === 'pending' ? 'text-yellow-400 border-yellow-400/50' : 
                                        offer.status === 'accepted' ? 'text-green-400 border-green-400/50' : 
                                        'text-red-400 border-red-400/50'
                                      }`}
                                    >
                                      {offer.status === 'pending' ? 'Ожидает' : 
                                       offer.status === 'accepted' ? 'Принято' : 'Отклонено'}
                                    </Badge>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Чат с продавцом</DialogTitle>
                        <DialogDescription className="text-white/70">
                          Обсудите детали покупки предмета "{item.name}"
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="h-60 overflow-y-auto space-y-2 p-4 bg-white/5 rounded-lg">
                          {chatMessages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.user === 'Вы' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                msg.user === 'Вы' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white/10 text-white'
                              }`}>
                                <div className="text-sm">{msg.message}</div>
                                <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Введите сообщение..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                            rows={2}
                          />
                          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                            <Icon name="Send" size={16} />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Supercell Games Section */}
      <section className="py-20 bg-gradient-to-r from-orange-900/20 via-yellow-900/20 to-red-900/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-4xl font-bold text-white mb-4">Игры Supercell</h3>
            <p className="text-xl text-white/80 max-w-2xl mx-auto">
              Торгуй аккаунтами, картами и предметами из популярных мобильных игр
            </p>
          </div>
          
          {/* Game Categories */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <Card className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                  <Icon name="Crown" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-xl">Clash Royale</CardTitle>
                <CardDescription className="text-white/70">
                  Легендарные карты и аккаунты
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-600/20 to-yellow-600/20 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-yellow-600 rounded-full flex items-center justify-center">
                  <Icon name="Castle" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-xl">Clash of Clans</CardTitle>
                <CardDescription className="text-white/70">
                  Прокачанные базы и ресурсы
                </CardDescription>
              </CardHeader>
            </Card>
            
            <Card className="bg-gradient-to-br from-pink-600/20 to-red-600/20 backdrop-blur-sm border-white/20 hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-pink-500 to-red-600 rounded-full flex items-center justify-center">
                  <Icon name="Zap" size={32} className="text-white" />
                </div>
                <CardTitle className="text-white text-xl">Brawl Stars</CardTitle>
                <CardDescription className="text-white/70">
                  Редкие бойцы и скины
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          {/* Supercell Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supercellItems.map((item, index) => (
              <Card 
                key={item.id} 
                className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge 
                      variant="secondary" 
                      className={`
                        ${item.game === 'Clash Royale' ? 'bg-blue-600' : ''}
                        ${item.game === 'Clash of Clans' ? 'bg-green-600' : ''}
                        ${item.game === 'Brawl Stars' ? 'bg-pink-600' : ''}
                      `}
                    >
                      {item.game}
                    </Badge>
                    <Badge 
                      className={`
                        ${item.rarity === 'Легендарная' ? 'bg-orange-500' : ''}
                        ${item.rarity === 'Мифическая' ? 'bg-purple-500' : ''}
                        ${item.rarity === 'Эпический' ? 'bg-blue-500' : ''}
                      `}
                    >
                      {item.rarity}
                    </Badge>
                  </div>
                  <div className="w-full h-32 bg-gradient-to-br from-yellow-500/20 to-orange-500/20 rounded-lg mb-4 flex items-center justify-center">
                    {item.game === 'Clash Royale' && <Icon name="Crown" size={48} className="text-white/50" />}
                    {item.game === 'Clash of Clans' && <Icon name="Castle" size={48} className="text-white/50" />}
                    {item.game === 'Brawl Stars' && <Icon name="Zap" size={48} className="text-white/50" />}
                  </div>
                  <CardTitle className="text-white">{item.name}</CardTitle>
                  <CardDescription className="text-white/70">
                    {item.type} • {item.condition}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-2xl font-bold text-yellow-400">₽{item.price}</span>
                    <span className="text-white/70">от {item.seller}</span>
                  </div>
                </CardContent>
                <CardFooter className="flex space-x-2">
                  <Button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                    Купить
                  </Button>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" className="border-white/30 text-white hover:bg-white/10">
                        <Icon name="MessageCircle" size={16} />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="bg-slate-900 border-white/20 text-white">
                      <DialogHeader>
                        <DialogTitle>Чат с продавцом</DialogTitle>
                        <DialogDescription className="text-white/70">
                          Обсудите детали покупки "{item.name}" в {item.game}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div className="h-60 overflow-y-auto space-y-2 p-4 bg-white/5 rounded-lg">
                          {chatMessages.map((msg) => (
                            <div key={msg.id} className={`flex ${msg.user === 'Вы' ? 'justify-end' : 'justify-start'}`}>
                              <div className={`max-w-xs px-3 py-2 rounded-lg ${
                                msg.user === 'Вы' 
                                  ? 'bg-blue-600 text-white' 
                                  : 'bg-white/10 text-white'
                              }`}>
                                <div className="text-sm">{msg.message}</div>
                                <div className="text-xs opacity-70 mt-1">{msg.time}</div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex space-x-2">
                          <Textarea
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="Введите сообщение..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/70"
                            rows={2}
                          />
                          <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-700">
                            <Icon name="Send" size={16} />
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>



      {/* Footer */}
      <footer className="bg-slate-900/50 backdrop-blur-sm border-t border-white/10 py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-white font-bold mb-4">GameMarket</h4>
              <p className="text-white/70 text-sm">
                Безопасная торговая площадка для игровых предметов
              </p>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Платформа</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Как продавать</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Как покупать</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Комиссии</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Поддержка</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Центр помощи</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Связаться с нами</a></li>
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h5 className="text-white font-semibold mb-4">Игры</h5>
              <ul className="space-y-2 text-white/70 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">CS2</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Dota 2</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Team Fortress 2</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-white/70 text-sm">
            © 2024 GameMarket. Все права защищены.
          </div>
        </div>
      </footer>

      {/* Global Chat */}
      {isChatOpen && (
        <div className="fixed bottom-4 right-4 w-96 h-[500px] bg-slate-900/95 backdrop-blur-md border border-white/20 rounded-lg shadow-2xl animate-scale-in z-50">
          <div className="flex items-center justify-between p-4 border-b border-white/20">
            <div className="flex items-center space-x-2">
              <Icon name="Users" size={20} className="text-blue-400" />
              <h3 className="text-white font-semibold">Общий чат</h3>
              <Badge className="bg-green-500/20 text-green-400 text-xs">
                {onlineUsers.length} онлайн
              </Badge>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsChatOpen(false)}
              className="text-white/70 hover:text-white hover:bg-white/10"
            >
              <Icon name="X" size={16} />
            </Button>
          </div>
          
          <div className="flex h-[400px]">
            {/* Chat Messages */}
            <div className="flex-1 flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {globalChatMessages.map((msg) => (
                  <div key={msg.id} className="flex items-start space-x-2">
                    <Avatar className="w-6 h-6">
                      <AvatarFallback className="text-xs bg-blue-600 text-white">
                        {msg.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-white text-sm font-medium">{msg.user}</span>
                        {msg.online && (
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        )}
                        <span className="text-white/50 text-xs">{msg.time}</span>
                      </div>
                      <p className="text-white/80 text-sm mt-1 break-words">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Message Input */}
              <div className="p-4 border-t border-white/20">
                <div className="flex space-x-2">
                  <Input
                    value={globalNewMessage}
                    onChange={(e) => setGlobalNewMessage(e.target.value)}
                    placeholder="Написать сообщение..."
                    className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 text-sm"
                    onKeyPress={(e) => e.key === 'Enter' && sendGlobalMessage()}
                  />
                  <Button 
                    onClick={sendGlobalMessage}
                    size="sm"
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Icon name="Send" size={14} />
                  </Button>
                </div>
              </div>
            </div>
            
            {/* Online Users */}
            <div className="w-32 border-l border-white/20 p-3">
              <h4 className="text-white/70 text-xs font-medium mb-3 uppercase tracking-wide">
                Онлайн
              </h4>
              <div className="space-y-2">
                {onlineUsers.map((user) => (
                  <div key={user.name} className="flex items-center space-x-2">
                    <div className="relative">
                      <Avatar className="w-6 h-6">
                        <AvatarFallback className="text-xs bg-green-600 text-white">
                          {user.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-400 rounded-full border border-slate-900"></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-white text-xs font-medium truncate">
                        {user.name}
                      </div>
                      <div className="text-white/50 text-xs truncate">
                        {user.status}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Chat Toggle Button */}
      <Button
        onClick={() => setIsChatOpen(!isChatOpen)}
        className="fixed bottom-4 right-4 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg z-40"
      >
        <Icon name={isChatOpen ? "X" : "MessageCircle"} size={24} className="text-white" />
      </Button>
    </div>
  );
}