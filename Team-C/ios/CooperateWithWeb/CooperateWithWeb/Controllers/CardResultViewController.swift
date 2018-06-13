//
//  CardResultViewController.swift
//  CooperateWithWeb
//
//  Created by EthanLin on 2018/6/13.
//  Copyright © 2018 EthanLin. All rights reserved.
//

import UIKit

class CardResultViewController: UIViewController {
    
//    let jsonString = UserDefaults.standard.string(forKey: UserDefaultsKeyManager.resultArray)
    
    
    var resultArray:[String]?
    var imageArray:[String] = []{
        didSet{
            cardResultCollectionView.reloadData()
        }
    }
    
    @IBOutlet weak var cardResultCollectionView: UICollectionView!
    
    @IBOutlet weak var remainingMoneyLabel: UILabel!
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        
        cardResultCollectionView.delegate = self
        cardResultCollectionView.dataSource = self
        
        
        // Do any additional setup after loading the view.
    }
    
    override func viewWillAppear(_ animated: Bool) {
        super.viewWillAppear(animated)
        remainingMoneyLabel.text = "顯示餘額:\(UserDefaults.standard.integer(forKey: UserDefaultsKeyManager.remainingMoney))"
        self.resultArray = UserDefaults.standard.array(forKey: UserDefaultsKeyManager.resultArray) as? [String] ?? []
        guard let resultArray = resultArray else {return}
        guard resultArray.count > 0 else {return}
        print("第二頁的ResultArray",resultArray)
        
        imageArray = []
        for i in 0...resultArray.count - 1{
            var eachJSONString = resultArray[i]
            print(eachJSONString)
            guard let converToJSONData = eachJSONString.data(using: String.Encoding.utf8) else {return}
            let json = try? JSONSerialization.jsonObject(with: converToJSONData, options: .mutableContainers)
            guard let jsonDic = json as? NSDictionary else {return}
            guard let eachImageName = jsonDic["src"] as? String else {return}
            print(eachImageName)
            self.imageArray.append(eachImageName)
        }
        print("imageArray裡面",imageArray)
//        for i in 0...imageArray.count - 1{
//            if imageArray[i+1] == imageArray[i]{
//                 
//            }
//        }
    }

    override func didReceiveMemoryWarning() {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }

}
extension CardResultViewController: UICollectionViewDelegate, UICollectionViewDataSource{
    
    func collectionView(_ collectionView: UICollectionView, numberOfItemsInSection section: Int) -> Int {
        return self.imageArray.count
    }
    
    func collectionView(_ collectionView: UICollectionView, cellForItemAt indexPath: IndexPath) -> UICollectionViewCell {
        let cardResultCell = collectionView.dequeueReusableCell(withReuseIdentifier: "CardResultCell", for: indexPath) as! CardResultCollectionViewCell
        cardResultCell.index = indexPath
        cardResultCell.updateUI(cardName: imageArray[indexPath.item])
        return cardResultCell
    }
    
    
}
