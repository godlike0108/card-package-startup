//
//  CardResultCollectionViewCell.swift
//  CooperateWithWeb
//
//  Created by EthanLin on 2018/6/13.
//  Copyright © 2018 EthanLin. All rights reserved.
//

import UIKit

class CardResultCollectionViewCell: UICollectionViewCell {
    
    @IBOutlet weak var drawNumber: UILabel!
    @IBOutlet weak var cardImageView: UIImageView!
    
    func updateUI(cardName:String){
        drawNumber.text = cardName
        print(cardName)
        var okImageName = cardName
        okImageName.replacingOccurrences(of: "/", with: "")
        self.cardImageView.image = UIImage(named: okImageName)
        }
}
