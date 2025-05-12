export const isClient = (req, res, next) => {
  if (req.user?.role !== 'client') return res.status(403).json({ message: 'Solo clientes' });
  next();
};

export const isWorker = (req, res, next) => {
  if (req.user?.role !== 'worker') return res.status(403).json({ message: 'Solo trabajadores' });
  next();
};

export const isAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') return res.status(403).json({ message: 'Solo administradores' });
  next();
};